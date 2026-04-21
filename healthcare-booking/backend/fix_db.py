import sqlite3

def fix_hashes():
    db = sqlite3.connect('healthcare.db')
    cursor = db.cursor()
    correct_hash = '$2b$12$14j2ZBmS9DlEM3MkuMeI2.1U1FS2zBy1i49jLtYDCpfCdKFpgHWpq'
    
    usernames = ['doc_smith', 'doc_jones', 'doc_drake']
    
    for uname in usernames:
        cursor.execute('UPDATE users SET password_hash = ? WHERE username = ?', (correct_hash, uname))
        print(f"Updated {uname}")
    
    db.commit()
    db.close()
    print("Database hashes fixed successfully.")

if __name__ == "__main__":
    fix_hashes()
