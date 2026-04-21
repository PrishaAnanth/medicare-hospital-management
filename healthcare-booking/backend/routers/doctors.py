from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.DoctorResponse, status_code=status.HTTP_201_CREATED)
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.require_role("doctor"))):

    if current_user.doctor_profile:
        raise HTTPException(status_code=400, detail="Doctor profile already exists for this user")
    
    existing_doc = db.query(models.Doctor).filter(models.Doctor.name == doctor.name).first()
    if existing_doc:
        raise HTTPException(status_code=400, detail="Duplicate doctor name")

    new_doctor = models.Doctor(
        name=doctor.name,
        specialization=doctor.specialization,
        start_hour=doctor.start_hour,
        end_hour=doctor.end_hour,
        user_id=current_user.id
    )
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor

@router.get("/", response_model=List[schemas.DoctorResponse])
def get_doctors(db: Session = Depends(get_db)):
    return db.query(models.Doctor).all()

@router.get("/me", response_model=schemas.DoctorResponse)
def get_my_doctor_profile(current_user: models.User = Depends(auth.require_role("doctor"))):
    if not current_user.doctor_profile:
        raise HTTPException(status_code=404, detail="Doctor profile not built")
    return current_user.doctor_profile

@router.patch("/me", response_model=schemas.DoctorResponse)
def update_my_doctor_profile(update_data: schemas.DoctorUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.require_role("doctor"))):
    doc = current_user.doctor_profile
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor profile not found")
    
    doc.is_available = update_data.is_available
    db.commit()
    db.refresh(doc)
    return doc

@router.patch("/{id}", response_model=schemas.DoctorResponse)
def update_doctor_availability_admin(id: int, update_data: schemas.DoctorUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.require_role("admin"))):
    doc = db.query(models.Doctor).filter(models.Doctor.id == id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    doc.is_available = update_data.is_available
    db.commit()
    db.refresh(doc)
    return doc

@router.get("/{id}/booked_slots", response_model=List[str])
def get_doctor_booked_slots(id: int, date: str, db: Session = Depends(get_db)):
   
    appts = db.query(models.Appointment).filter(models.Appointment.doctor_id == id).all()
    booked = []
    for appt in appts:
        if appt.slot.strftime('%Y-%m-%d') == date:
            booked.append(appt.slot.isoformat())
    return booked
