from sqlalchemy import create_engine, text
engine = create_engine('sqlite:///healthcare.db')
with engine.connect() as conn:
    print("--- USERS ---")
    res = conn.execute(text("SELECT username, role FROM users"))
    for row in res:
        print(row)
    print("\n--- FEEDBACKS ---")
    res = conn.execute(text("SELECT * FROM feedbacks"))
    for row in res:
        print(row)
