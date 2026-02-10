from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.profile import Profile

profile_bp = Blueprint("profile", __name__, url_prefix="/api/profile")

@profile_bp.route("", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()

    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"message": "Profile not created yet"}), 404
    
    return jsonify({
        "bio": profile.bio,
        "phone": profile.phone,
        "photo_url" : profile.photo_url,
        # "updated_at": profile.updated_at
        "updated_at": profile.updated_at.isoformat() if profile.updated_at else None

    }), 200
    
@profile_bp.route("", methods=["POST"])
@jwt_required()
def create_or_update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Missing JSON body"}), 400
    
    profile = Profile.query.filter_by(user_id=user_id).first()

    if not profile:
        profile = Profile(user_id=user_id)

    profile.bio = data.get("bio")
    profile.phone = data.get("phone")
    profile.photo_url = data.get("photo_url")

    db.session.add(profile)
    db.session.commit()

    return jsonify({"message": "Profile saved successfully"}), 200