import sqlite3
import os
from auth import get_password_hash

db_path = os.path.join(os.getcwd(), 'healthcare.db')
print(f"Connecting to {db_path} for Final Pure Admin Seed...")

db = sqlite3.connect(db_path)
try:
    db.execute("DELETE FROM feedbacks")
    db.execute("DELETE FROM appointments")
    db.execute("DELETE FROM doctors")
    db.execute("DELETE FROM users")
    
    admin_hash = get_password_hash('Admin@123')
    db.execute("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
               ('clinic_admin', admin_hash, 'admin'))
    
    doctors = [
        # Cardiologist
        ('Dr. Smrithi', 'Cardiologist', 9, 17, 'Female'),
        ('Dr. Robert', 'Cardiologist', 10, 18, 'Male'),
        # Neurologist
        ('Dr. Aryan', 'Neurologist', 10, 18, 'Male'),
        ('Dr. Sarah', 'Neurologist', 9, 17, 'Female'),
        # General Surgeon
        ('Dr. Smith', 'General Surgeon', 8, 16, 'Male'),
        ('Dr. Elena', 'General Surgeon', 10, 18, 'Female'),
        # Dermatologist
        ('Dr. Jones', 'Dermatologist', 9, 15, 'Female'),
        ('Dr. Michael', 'Dermatologist', 8, 16, 'Male'),
        # Psychiatrist
        ('Dr. Drake', 'Psychiatrist', 11, 19, 'Male'),
        ('Dr. Olivia', 'Psychiatrist', 9, 17, 'Female'),
        # Orthopedic
        ('Dr. Wilson', 'Orthopedic', 9, 17, 'Male'),
        ('Dr. Sophia', 'Orthopedic', 10, 18, 'Female'),
        # Diagnostic
        ('Dr. House', 'Diagnostic', 10, 20, 'Male'),
        ('Dr. Lisa', 'Diagnostic', 8, 16, 'Female'),
        # General Practitioner
        ('Dr. Grey', 'General Practitioner', 8, 14, 'Female'),
        ('Dr. James', 'General Practitioner', 9, 17, 'Male')
    ]
    
    for name, spec, start, end, gender in doctors:
        db.execute("INSERT INTO doctors (name, specialization, start_hour, end_hour, is_available, gender) VALUES (?, ?, ?, ?, ?, ?)",
                   (name, spec, start, end, 1, gender))
    
    db.commit()
    print("SUCCESS: System converted to Pure Admin Model.")
    print("- Only 'clinic_admin' can manage the hospital.")
    print("- Doctors are entities monitored by Admin, no logins required.")
except Exception as e:
    print(f"Error during Pure Admin Seed: {e}")
finally:
    db.close()
