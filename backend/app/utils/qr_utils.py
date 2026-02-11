import qrcode
from io import BytesIO
import base64
from datetime import date
from itsdangerous import URLSafeSerializer
from flask import current_app

def get_serializer():
    return URLSafeSerializer(current_app.config["SECRET_KEY"], salt="qr-attendance")

def generate_qr_token(user_id):
    serializer = get_serializer()

    payload = {
        "uid": user_id,
        "date": str(date.today())
    }
        
    token = serializer.dumps(payload)
    return token

def generate_qr_image(token):
    qr= qrcode.make(token)

    buffer = BytesIO()
    qr.save(buffer, 'PNG')
    buffer.seek(0)
    
    img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return img_base64

def verify_qr_token(token):
    serializer = get_serializer()

    try:
        data = serializer.loads(token)
        return data
    except Exception:
        return None