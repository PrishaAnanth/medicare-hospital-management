import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from database import Base, get_db
from models import User, Doctor, Appointment
from auth import get_password_hash
from datetime import datetime

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_challenge.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    p_hash = get_password_hash("password123")
    patient = User(username="test_patient", password_hash=p_hash, role="patient")
    admin = User(username="test_admin", password_hash=p_hash, role="admin")
    db.add_all([patient, admin])
    
    doctor = User(username="test_doc", password_hash=p_hash, role="doctor")
    db.add(doctor)
    db.commit()
    
    doc_profile = Doctor(name="Dr. Tester", specialization="Testing", start_hour=9, end_hour=17, user_id=doctor.id, is_available=True)
    db.add(doc_profile)
    db.commit()
    
    yield db
    db.close()

client = TestClient(app)

def get_token(username, password):
    res = client.post("/auth/login", json={"username": username, "password": password})
    return res.data["access_token"]


def test_booking_logic(setup_db):
    db = setup_db
    doc = db.query(Doctor).first()
 
    login_res = client.post("/auth/login", json={"username": "test_patient", "password": "password123"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    slot = "2026-05-20T10:00:00"
    res = client.post("/appointments/", json={"doctor_id": doc.id, "slot": slot}, headers=headers)
    assert res.status_code == 201
    
    res = client.post("/appointments/", json={"doctor_id": doc.id, "slot": slot}, headers=headers)
    assert res.status_code == 409
    assert res.json()["detail"] == "Double-booking same slot"
    
    bad_slot = "2026-05-20T07:00:00"
    res = client.post("/appointments/", json={"doctor_id": doc.id, "slot": bad_slot}, headers=headers)
    assert res.status_code == 400
    assert res.json()["detail"] == "Slot outside working hours"
    
    doc.is_available = False
    db.commit()
    res = client.post("/appointments/", json={"doctor_id": doc.id, "slot": "2026-05-20T11:00:00"}, headers=headers)
    assert res.status_code == 400
    assert res.json()["detail"] == "Practitioner is currently unavailable"
