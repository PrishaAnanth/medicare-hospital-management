from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.AppointmentResponse, status_code=status.HTTP_201_CREATED)
def book_appointment(appt: schemas.AppointmentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.require_role("patient"))):
    doc = db.query(models.Doctor).filter(models.Doctor.id == appt.doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
        
    if not doc.is_available:
        raise HTTPException(status_code=400, detail="Practitioner is currently unavailable")
        
    hour = appt.slot.hour
    if hour < doc.start_hour or hour >= doc.end_hour:
        raise HTTPException(status_code=400, detail="Slot outside working hours")
        
    existing_doctor_appt = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == appt.doctor_id,
        models.Appointment.slot == appt.slot
    ).first()
    
    if existing_doctor_appt:
        raise HTTPException(status_code=409, detail="Doctor is already booked for this slot")

    existing_patient_appt = db.query(models.Appointment).filter(
        models.Appointment.patient_name == current_user.username,
        models.Appointment.slot == appt.slot
    ).first()

    if existing_patient_appt:
        raise HTTPException(status_code=409, detail="You already have an appointment at this time")

    new_appt = models.Appointment(
        doctor_id=appt.doctor_id,
        patient_name=current_user.username,
        slot=appt.slot
    )
    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)
    return new_appt

@router.get("/", response_model=List[schemas.AppointmentResponse])
def list_appointments(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role == "admin":
        return db.query(models.Appointment).all()
    elif current_user.role == "doctor":
        doc_profile = current_user.doctor_profile
        if doc_profile:
            return db.query(models.Appointment).filter(models.Appointment.doctor_id == doc_profile.id).all()
        return []
    else:
        return db.query(models.Appointment).filter(models.Appointment.patient_name == current_user.username).all()

@router.patch("/{id}", response_model=schemas.AppointmentResponse)
def update_appointment_status(id: int, update_data: schemas.AppointmentUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role not in ["doctor", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    query = db.query(models.Appointment).filter(models.Appointment.id == id)
    
    if current_user.role == "doctor":
        doc_profile = current_user.doctor_profile
        if not doc_profile:
             raise HTTPException(status_code=404, detail="Doctor profile not found")
        query = query.filter(models.Appointment.doctor_id == doc_profile.id)
    
    appt = query.first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
        
    appt.status = update_data.status
    db.commit()
    db.refresh(appt)
    return appt

@router.delete("/{id}")
def cancel_appointment(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.require_role("patient"))):
    appt = db.query(models.Appointment).filter(
        models.Appointment.id == id,
        models.Appointment.patient_name == current_user.username
    ).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
        
    db.delete(appt)
    db.commit()
    return {"detail": "Appointment cancelled"}
