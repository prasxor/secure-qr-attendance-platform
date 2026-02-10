# from flask import Blueprint, request, jsonify
# from werkzeug.security import generate_password_hash
# from app import db
# from app.models.user import User

# auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


# @auth_bp.route("/register", methods=["POST"])
# def register():
#     data = request.get_json()

#     if not data:
#         return jsonify({"error": "Missing JSON body"}), 400
    
#     name = data.get("name")
#     email= data.get("email")
#     password = data.get("password")

#     if not all([name, email,password]):
#         return jsonify({"error": "All fields required"}), 400
    
#     if User.query.filter_by(email=email).first():
#         return jsonify({"error": "Email already registered"}), 409
    
#     password_hash = generate_password_hash(password)

#     user = User(
#         name=name,
#         email=email,
#         password= password_hash,
#         is_admin=False,
#     )
    
#     db.session.add(user)
#     db.session.commit()
    
#     return jsonify({
#         "message": "User registered successfully",
#         "user_id": user.id
#     }), 201



from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app import db
from app.models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Missing JSON body"}), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"error": "All fields required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    password_hash = generate_password_hash(password)

    user = User(
        name=name,
        email=email,
        password_hash=password_hash,
        is_admin=False
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user_id": user.id
    }), 201

from werkzeug.security import check_password_hash

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Missing JSON body"}), 400
    
    email= data.get("email")
    password = data.get("password")

    if not all([email,password]):
        return jsonify({"error": "Email and password required"}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    
    if not check_password_hash(user.password_hash,password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    return jsonify({
        "message": "Login successful",
        "user_id": user.id,
        "is_admin": user.is_admin
    }), 200