import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")
    
    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://root:@localhost/secure_attendance_system"
    )
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False