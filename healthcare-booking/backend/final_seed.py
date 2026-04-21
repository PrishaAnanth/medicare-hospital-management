import sqlite3
import os
from auth import get_password_hash

db_path = os.path.join(os.getcwd(), 'healthcare.db')
print(f"Connecting to {db_path} for Final Master Seed...")

db = sqlite3.connect(db_path)
try:
    # 1. Clear tables for a fresh fleet
    db.execute("DELETE FROM feedbacks")
    db.execute("DELETE FROM appointments")
    db.execute("DELETE FROM doctors")
    
    # 2. Seed Master Fleet (Centrally Managed)
    doctors = [
        ('Dr. Smrithi', 'Cardiologist', 9, 17),
        ('Dr. Aryan', 'Neurologist', 10, 18),
        ('Dr. Smith', 'General Surgeon', 8, 16),
        ('Dr. Jones', 'Dermatologist', 9, 15),
        ('Dr. Drake', 'Psychiatrist', 11, 19),
        ('Dr. Wilson', 'Orthopedic', 9, 17),
        ('Dr. House', 'Diagnostic', 10, 20),
        ('Dr. Grey', 'General Practitioner', 8, 14)
    ]
    
    for name, spec, start, end in doctors:
        db.execute("INSERT INTO doctors (name, specialization, start_hour, end_hour, is_available) VALUES (?, ?, ?, ?, ?)",
                   (name, spec, start, end, 1))
    
    db.execute("INSERT INTO feedbacks (doctor_id, patient_name, rating, comment) VALUES (?, ?, ?, ?)",
               (1, 'patient_amy', 5, 'Exceptional cardiologist. Explained everything clearly.'))
    db.execute("INSERT INTO feedbacks (doctor_id, patient_name, rating, comment) VALUES (?, ?, ?, ?)",
               (1, 'patient_bob', 4, 'Very professional, though the wait was a bit long.'))
    db.execute("INSERT INTO feedbacks (doctor_id, patient_name, rating, comment) VALUES (?, ?, ?, ?)",
               (2, 'patient_tim', 5, 'Dr. Aryan is a genius! Highly recommend for neuro issues.'))
    db.execute("INSERT INTO feedbacks (doctor_id, patient_name, rating, comment) VALUES (?, ?, ?, ?)",
               (3, 'patient_amy', 3, 'Average experience. Surgery went well but follow-up was rushed.'))
    
    db.commit()
    print("Hospital Fleet initialized with 8 specialists and 4 sample feedbacks.")
except Exception as e:
    print(f"Error seeding: {e}")
finally:
    db.close()
