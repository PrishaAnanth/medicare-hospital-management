import sqlite3
import os
from auth import get_password_hash

db_path = os.path.join(os.getcwd(), 'healthcare.db')
print(f"Connecting to {db_path} to restore Admin...")

db = sqlite3.connect(db_path)
try:
    h = get_password_hash('Admin@123')
    
    db.execute("DELETE FROM users WHERE username='clinic_admin'")
    db.execute("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)", 
               ('clinic_admin', h, 'admin'))
    
    db.execute("DELETE FROM doctors")
    db.execute("INSERT INTO doctors (name, specialization, start_hour, end_hour, is_available) VALUES (?, ?, ?, ?, ?)",
               ('Dr. Smrithi', 'Cardiologist', 9, 17, 1))
    db.execute("INSERT INTO doctors (name, specialization, start_hour, end_hour, is_available) VALUES (?, ?, ?, ?, ?)",
               ('Dr. Aryan', 'Neurologist', 10, 18, 1))
    db.execute("INSERT INTO doctors (name, specialization, start_hour, end_hour, is_available) VALUES (?, ?, ?, ?, ?)",
               ('Dr. Smith', 'General Surgeon', 8, 16, 1))
    
    db.commit()
    print("Admin 'clinic_admin' restored with password 'Admin@123'")
    print("Doctors seeded for monitoring.")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
