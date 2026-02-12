# Secure QR Attendance Platform

A production-oriented full-stack application designed to provide secure, scalable, and tamper-resistant QR-based attendance management.

This system enables authenticated users to generate unique QR codes and allows authorized administrators to scan and verify attendance in real time.

The platform is built with modern frontend and backend technologies and is structured for scalability, security, and future expansion into institutional or enterprise use.

---

## Executive Summary

Manual attendance systems are inefficient, error-prone, and vulnerable to manipulation. Many institutions still rely on paper registers or loosely controlled digital logs that lack proper verification.

This platform addresses those gaps by:

- Providing secure authentication using JWT
- Generating user-specific QR codes
- Restricting scanning privileges to authorized administrators
- Verifying QR payload integrity before marking attendance
- Storing attendance records in a structured relational database
- Offering a calendar-based visual attendance overview

The system is designed to serve as a foundation for educational institutions, training centers, corporate offices, and event-based attendance tracking.

---

## Core Features

- Secure user registration and authentication
- Role-based access control (User / Admin)
- QR code generation per authenticated user
- Admin-only QR scanning interface
- Real-time attendance validation and storage
- Editable user profile (bio, phone, photo URL)
- Monthly attendance calendar visualization

---

## Technology Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- html5-qrcode
- lucide-react

### Backend

- Flask
- Flask-JWT-Extended
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-CORS
- MySQL (via PyMySQL)
- QRCode (Python)

---

## System Architecture Overview

Frontend (React + Vite)
- Handles authentication flows
- Displays profile and calendar views
- Generates QR display interface
- Uses camera-based QR scanning for admins

Backend (Flask API)
- Issues and validates JWT tokens
- Generates QR payloads
- Verifies scanned QR integrity
- Stores attendance records in MySQL
- Enforces role-based access

Database (MySQL)
- Users table
- Profiles table
- Attendance table

---

## Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/your-username/secure-qr-attendance-platform.git
cd secure-qr-attendance-platform
```

---

## Backend Setup

### Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create MySQL Database

```sql
CREATE DATABASE secure_attendance_system;
```

Update database credentials in:

```
backend/app/config.py
```

### Run Database Migrations

```bash
flask db upgrade
```

### Start Backend Server

```bash
python run.py
```

Default backend address:

```
http://localhost:5001
```

---

## Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Mobile Scanning Configuration

To enable QR scanning via mobile device:

1. Run backend with external host access:

```python
app.run(host="0.0.0.0", port=5001)
```

2. Update Axios baseURL in:

```
frontend/src/api/http.js
```

Example:

```js
baseURL: "http://192.168.x.x:5001/api"
```

3. Access the frontend via mobile browser using your local IP:

```
http://192.168.x.x:5173
```

---

## Scalability & Expansion Potential

This project is structured to support:

- Multi-organization deployment
- Analytics dashboards for administrators
- CSV export of attendance records
- Cloud deployment (AWS / GCP / Azure)
- File-based profile image uploads
- Audit logs for compliance use cases

The architecture supports extension into SaaS-based institutional attendance solutions.

---

## Use Cases

- Educational institutions
- Corporate training programs
- Event attendance management
- Certification workshops
- Internship tracking systems

---

## License

This project is intended for educational, portfolio, and scalable prototype purposes.