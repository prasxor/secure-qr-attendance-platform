from flask import Blueprint, request, jsonify
from datetime import date
from app import db
from app.models.attendance import Attendance
from app.utils.qr_utils import verify_qr_token
from app.utils.decorators import admin_required

attendance_bp = Blueprint(
    "attendance",
    __name__,
    url_prefix="/api/attendance"
)

@attendance_bp.route("/scan", methods=["POST"])
@admin_required
def scan_qr():
    data = request.get_json()

    if not data or "token" not in data:
        return jsonify({"error": "QR token required"}), 400
    
    token = data["token"]

    payload = verify_qr_token(token)

    if not payload:
        return jsonify({"error": "Invalid or tampered QR"}), 400
    
    user_id = payload.get("uid")
    qr_date = payload.get("date")

    if str(date.today()) != qr_date:
        return jsonify({"error": "QR expired"}), 400
    
    existing = Attendance.query.filter_by(
        user_id = user_id,
        attendance_date = date.today()
    ).first()
    
    if existing:
        return jsonify({"error": "Attendance already marked today"}), 409
    
    attendance = Attendance(
        user_id = user_id,
        attendance_date = date.today()
    )
    
    db.session.add(attendance)
    db.session.commit()

    return jsonify({"message": "Attendance marked successfully"}), 200