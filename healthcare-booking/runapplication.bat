@echo off
cd backend
call env\Scripts\activate
start cmd /k "python -m uvicorn main:app --reload --port 8000"
cd ..\frontend
start cmd /k "npm start"
echo Backend: http://localhost:8000/docs  Frontend: http://localhost:3000
