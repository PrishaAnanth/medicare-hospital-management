import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app
from database import Base, get_db
import models

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_register_user_success():
    response = client.post("/auth/register", json={"username": "testuser", "password": "Test@123", "role": "patient"})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "patient"

def test_login_success_and_token_returned():
    client.post("/auth/register", json={"username": "testuser", "password": "Test@123", "role": "patient"})
    response = client.post("/auth/login", json={"username": "testuser", "password": "Test@123"})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data

def test_login_with_wrong_password():
    client.post("/auth/register", json={"username": "testuser", "password": "Test@123", "role": "patient"})
    response = client.post("/auth/login", json={"username": "testuser", "password": "wrongpassword"})
    assert response.status_code == 401

def get_auth_token(username, role):
    client.post("/auth/register", json={"username": username, "password": "Test@123", "role": role})
    response = client.post("/auth/login", json={"username": username, "password": "Test@123"})
    return response.json()["access_token"]

def test_create_doctor_authenticated_as_doctor():
    token = get_auth_token("doc1", "doctor")
    response = client.post("/doctors/", json={
        "name": "Dr. House",
        "specialization": "Diagnostician",
        "start_hour": 9,
        "end_hour": 17
    }, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 201

def test_duplicate_doctor_name():
    token1 = get_auth_token("doc1", "doctor")
    client.post("/doctors/", json={
        "name": "Dr. Duplicate",
        "specialization": "General",
        "start_hour": 9,
        "end_hour": 17
    }, headers={"Authorization": f"Bearer {token1}"})

    token2 = get_auth_token("doc2", "doctor")
    response = client.post("/doctors/", json={
        "name": "Dr. Duplicate",
        "specialization": "Surgeon",
        "start_hour": 10,
        "end_hour": 18
    }, headers={"Authorization": f"Bearer {token2}"})
    assert response.status_code == 400

def test_book_appointment():
    doc_token = get_auth_token("doc1", "doctor")
    doc_res = client.post("/doctors/", json={
        "name": "Dr. Smith",
        "specialization": "General",
        "start_hour": 9,
        "end_hour": 17
    }, headers={"Authorization": f"Bearer {doc_token}"})
    doc_id = doc_res.json()["id"]

    pat_token = get_auth_token("pat1", "patient")
    response = client.post("/appointments/", json={
        "doctor_id": doc_id,
        "slot": "2026-05-10T10:00:00"
    }, headers={"Authorization": f"Bearer {pat_token}"})
    assert response.status_code == 201

def test_double_booking_same_slot():
    doc_token = get_auth_token("doc1", "doctor")
    doc_res = client.post("/doctors/", json={
        "name": "Dr. Smith",
        "specialization": "General",
        "start_hour": 9,
        "end_hour": 17
    }, headers={"Authorization": f"Bearer {doc_token}"})
    doc_id = doc_res.json()["id"]

    pat_token1 = get_auth_token("pat1", "patient")
    client.post("/appointments/", json={
        "doctor_id": doc_id,
        "slot": "2026-05-10T10:00:00"
    }, headers={"Authorization": f"Bearer {pat_token1}"})

    pat_token2 = get_auth_token("pat2", "patient")
    response = client.post("/appointments/", json={
        "doctor_id": doc_id,
        "slot": "2026-05-10T10:00:00"
    }, headers={"Authorization": f"Bearer {pat_token2}"})
    assert response.status_code == 409

def test_slot_before_working_hours():
    doc_token = get_auth_token("doc1", "doctor")
    doc_res = client.post("/doctors/", json={"name": "Dr. Smith", "specialization": "General", "start_hour": 9, "end_hour": 17}, headers={"Authorization": f"Bearer {doc_token}"})
    doc_id = doc_res.json()["id"]

    pat_token = get_auth_token("pat1", "patient")
    response = client.post("/appointments/", json={"doctor_id": doc_id, "slot": "2026-05-10T08:00:00"}, headers={"Authorization": f"Bearer {pat_token}"})
    assert response.status_code == 400

def test_slot_at_end_hour_boundary():
    doc_token = get_auth_token("doc1", "doctor")
    doc_res = client.post("/doctors/", json={"name": "Dr. Smith", "specialization": "General", "start_hour": 9, "end_hour": 17}, headers={"Authorization": f"Bearer {doc_token}"})
    doc_id = doc_res.json()["id"]

    pat_token = get_auth_token("pat1", "patient")
    response = client.post("/appointments/", json={"doctor_id": doc_id, "slot": "2026-05-10T17:00:00"}, headers={"Authorization": f"Bearer {pat_token}"})
    assert response.status_code == 400

def test_slot_at_start_hour_boundary():
    doc_token = get_auth_token("doc1", "doctor")
    doc_res = client.post("/doctors/", json={"name": "Dr. Smith", "specialization": "General", "start_hour": 9, "end_hour": 17}, headers={"Authorization": f"Bearer {doc_token}"})
    doc_id = doc_res.json()["id"]

    pat_token = get_auth_token("pat1", "patient")
    response = client.post("/appointments/", json={"doctor_id": doc_id, "slot": "2026-05-10T09:00:00"}, headers={"Authorization": f"Bearer {pat_token}"})
    assert response.status_code == 201

def test_cancel_appointment():
    doc_token = get_auth_token("doc1", "doctor")
    doc_res = client.post("/doctors/", json={"name": "Dr. Smith", "specialization": "General", "start_hour": 9, "end_hour": 17}, headers={"Authorization": f"Bearer {doc_token}"})
    doc_id = doc_res.json()["id"]

    pat_token = get_auth_token("pat1", "patient")
    appt_res = client.post("/appointments/", json={"doctor_id": doc_id, "slot": "2026-05-10T10:00:00"}, headers={"Authorization": f"Bearer {pat_token}"})
    appt_id = appt_res.json()["id"]

    response = client.delete(f"/appointments/{appt_id}", headers={"Authorization": f"Bearer {pat_token}"})
    assert response.status_code == 200

def test_slot_free_again_after_cancel():
    doc_token = get_auth_token("doc1", "doctor")
    doc_res = client.post("/doctors/", json={"name": "Dr. Smith", "specialization": "General", "start_hour": 9, "end_hour": 17}, headers={"Authorization": f"Bearer {doc_token}"})
    doc_id = doc_res.json()["id"]

    pat_token = get_auth_token("pat1", "patient")
    appt_res = client.post("/appointments/", json={"doctor_id": doc_id, "slot": "2026-05-10T10:00:00"}, headers={"Authorization": f"Bearer {pat_token}"})
    appt_id = appt_res.json()["id"]
    client.delete(f"/appointments/{appt_id}", headers={"Authorization": f"Bearer {pat_token}"})

    response = client.post("/appointments/", json={"doctor_id": doc_id, "slot": "2026-05-10T10:00:00"}, headers={"Authorization": f"Bearer {pat_token}"})
    assert response.status_code == 201

def test_unauthenticated_booking():
    response = client.post("/appointments/", json={"doctor_id": 1, "slot": "2026-05-10T10:00:00"})
    assert response.status_code == 401
