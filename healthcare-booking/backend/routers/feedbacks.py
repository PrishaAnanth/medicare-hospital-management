from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.FeedbackResponse, status_code=status.HTTP_201_CREATED)
def leave_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.require_role("patient"))):
   
    
    new_feedback = models.Feedback(
        doctor_id=feedback.doctor_id,
        patient_name=current_user.username,
        rating=feedback.rating,
        comment=feedback.comment
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

@router.get("/", response_model=List[schemas.FeedbackResponse])
def list_feedbacks(db: Session = Depends(get_db), current_user: models.User = Depends(auth.require_role("admin"))):
    return db.query(models.Feedback).all()

@router.get("/{doctor_id}", response_model=List[schemas.FeedbackResponse])
def get_doctor_feedbacks(doctor_id: int, db: Session = Depends(get_db)):
    return db.query(models.Feedback).filter(models.Feedback.doctor_id == doctor_id).all()
