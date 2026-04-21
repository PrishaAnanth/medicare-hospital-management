from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, doctors, appointments, feedbacks

app = FastAPI(title="Healthcare Appointment Booking System")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(doctors.router, prefix="/doctors", tags=["doctors"])
app.include_router(appointments.router, prefix="/appointments", tags=["appointments"])
app.include_router(feedbacks.router, prefix="/feedbacks", tags=["feedbacks"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Healthcare Booking API"}
