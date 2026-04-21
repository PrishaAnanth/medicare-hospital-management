from sqlalchemy import Column, Integer, String, ForeignKey, CheckConstraint, TIMESTAMP, Boolean
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)

    __table_args__ = (
        CheckConstraint(role.in_(['patient', 'doctor', 'admin']), name='role_check'),
    )

    doctor_profile = relationship("Doctor", back_populates="user", uselist=False)

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    specialization = Column(String)
    start_hour = Column(Integer)
    end_hour = Column(Integer)
    is_available = Column(Boolean, default=True)
    gender = Column(String, default="Male")
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="doctor_profile")
    appointments = relationship("Appointment", back_populates="doctor")
    feedbacks = relationship("Feedback", back_populates="doctor")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    patient_name = Column(String)
    slot = Column(TIMESTAMP)
    status = Column(String, default="scheduled")

    doctor = relationship("Doctor", back_populates="appointments")

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    patient_name = Column(String)
    rating = Column(Integer)  # 1-5
    comment = Column(String)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

    doctor = relationship("Doctor", back_populates="feedbacks")

