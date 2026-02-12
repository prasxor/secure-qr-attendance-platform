from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.qr_utils import generate_qr_image, generate_qr_token

qr_bp = Blueprint("qr", __name__, url_prefix="/api/qr")

@qr_bp.route("/generate", methods=["GET"])
@jwt_required()
def generate_qr():
    user_id = get_jwt_identity()

    token = generate_qr_token(user_id)
    qr_image = generate_qr_image(token)

    return jsonify({
        "token": token,
        "qr_image_base64": qr_image
    }), 200