# MediCare: Centralized Hospital Management System

MediCare is a high-performance, single-authority healthcare orchestration platform designed to streamline clinical workflows and patient coordination. It empowers a single **Hospital Admin** to oversee a fleet of practitioners and manage the entire clinical-to-billing lifecycle.

## 🏛️ Core Architecture: Centralized Oversight
MediCare operates on a **Pure Administrative Model**:
- **Single Source of Truth**: The `clinic_admin` manages all practitioners, schedules, and financial settlements.
- **Practitioner Entities**: Doctors are managed as unified hospital assets rather than individual users, eliminating the need for complex multi-login practitioner management.
- **Role-Based Security**: Strict isolation between the Patient Portal and the Hospital Control Center (Admin).

## 🌟 Key Features

### 🏢 Hospital Control Center (Admin Portal)
- **Master Appointment Schedule**: A consolidated, live view of every session in the hospital.
- **Clinical Pipeline Management**: Multi-stage workflow for every patient visit:
    - **Confirmed**: Scheduled and awaiting arrival.
    - **Treatment Over**: Confirmed by staff that the session occurred.
    - **Billed & Paid**: Financial settlement completed by the Admin.
- **Practitioner Analytics**:
    - Manage a balanced fleet of 16 practitioners across 8 specializations.
    - Real-time **Online/Offline** availability toggles.
    - **Average Rating Monitoring** based on patient feedback.
- **Operation Stats**: Live tracking of Hospital Fleet, Upcoming Patient Load, and Completed Work.

### 🏥 Patient Portal
- **Smart Practitioner Discovery**:
    - Filter doctors by **Specialization** and **Gender** (Male/Female) via an intuitive sidebar.
    - Real-time availability badges ([M]/[F]) on all provider cards.
- **Official Digital Receipts**: 
    - Generate a **Clinical Appointment Slip** (Digital Receipt) for every booking.
    - Encrypted Reference IDs and clear **Arrival Instructions** (10-minute early check-in).
- **Session History & Feedback**: Track your medical journey and provide ratings to improve hospital care quality.

## 🛠️ Technology Stack
- **Backend**: FastAPI (Python 3.10+) with SQLAlchemy ORM.
- **Frontend**: React (SPA) with Premium Vanilla CSS and Blur effects.
- **Validation Engine**: Real-time temporal validation to prevent conflicts.

## 🚀 Setup & Execution (Windows)

1. **Initialize System**: Run the developer setup to prepare the environment and seed the balanced practitioner fleet:
   ```powershell
   .\setupdev.bat
   ```
2. **Launch Portal**: Start the full-stack application concurrently:
   ```powershell
   .\runapplication.bat
   ```

### 🔐 System Credentials
| Role | Username | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Hospital Admin** | `clinic_admin` | `Admin@123` | Full access to Control Center. |
| **Patient** | *Any Registration* | *Any Password* | Register a new account in the portal. |

## 🛡️ Clinical Rule Engine
MediCare enforces rigorous operational boundaries:
- **Doctor Conflict Guard**: Blocks double-booking of a practitioner for the same slot.
- **Patient Conflict Guard**: Prevents a patient from booking overlapping sessions across different departments.
- **Shift Integrity**: Only allows bookings within a practitioner's verified working hours.
- **Action Gating**: Sequential UI logic ensures bills are only settled after treatment is verified over.
