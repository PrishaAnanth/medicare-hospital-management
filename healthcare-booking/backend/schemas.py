from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional, List

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = Field(..., pattern="^(patient|doctor|admin)$")

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class DoctorCreate(BaseModel):
    name: str
    specialization: str
    start_hour: int = Field(ge=0, le=23)
    end_hour: int = Field(ge=0, le=24)
    gender: str = "Male"

class DoctorUpdate(BaseModel):
    is_available: bool

class DoctorResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    specialization: str
    start_hour: int
    end_hour: int
    is_available: bool
    gender: str
    user_id: Optional[int] = None

class FeedbackCreate(BaseModel):
    doctor_id: int
    rating: int = Field(ge=1, le=5)
    comment: str

class FeedbackResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    doctor_id: int
    patient_name: str
    rating: int
    comment: str
    created_at: Optional[datetime] = None

class AppointmentCreate(BaseModel):
    doctor_id: int
    slot: datetime

class AppointmentUpdate(BaseModel):
    status: str = Field(..., pattern="^(scheduled|treatment_over|completed)$")

class AppointmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    doctor_id: int
    patient_name: str
    slot: datetime
    status: str
