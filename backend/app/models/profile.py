from app import db
from datetime import datetime

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True
    )
    
    bio = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    photo_url = db.Column(db.String(255))

    updated_at = db.Column(
        db.DateTime,
        default = datetime.utcnow,
        onupdate = datetime.utcnow
    )