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