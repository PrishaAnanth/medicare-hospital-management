import sqlite3
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from auth import verify_password

def test_login():
    db = sqlite3.connect('healthcare.db')
    cur = db.cursor()
    cur.execute('SELECT password_hash FROM users WHERE username = ?', ('doc_smith',))
    row = cur.fetchone()
    if not row:
        print("User doc_smith not found in DB")
        return
    
    h = row[0]
    print(f"Testing hash: {h}")
    result = verify_password('Test@123', h)
    print(f"Verification for 'Test@123': {result}")
    db.close()

if __name__ == "__main__":
    test_login()
