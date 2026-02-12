from flask import Blueprint, request, jsonify
from datetime import date
from datetime import datetime
from app import db
from app.models.attendance import Attendance
from app.utils.qr_utils import verify_qr_token
from app.utils.decorators import admin_required
from flask_jwt_extended import jwt_required, get_jwt_identity

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

@attendance_bp.route("/calendar", methods=["GET"])
@jwt_required()
def get_calendar():
    user_id = get_jwt_identity()

    month = request.args.get("month") # YYYY-MM

    if not month:
        return jsonify({"error": "Month parameter required (YYYY-MM)"}), 400

    try:
        start_date = datetime.strptime(month + "-01", "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid month format"}), 400
    
    if start_date.month== 12:
        end_date = start_date.replace(year=start_date.year+1, month=1)
    else:
        end_date = start_date.replace(month=start_date.month+1)

    records = Attendance.query.filter(
        Attendance.user_id == user_id,
        Attendance.attendance_date >= start_date,
        Attendance.attendance_date < end_date
    ).all()
    
    present_days = [str(r.attendance_date) for r in records]

    return jsonify({
        "month": month,
        "present_days": present_days
    }),200