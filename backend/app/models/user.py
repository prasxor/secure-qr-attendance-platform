from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"

# database creation baby
    id = db.Column(db.Integer, primary_key=True)
    
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable = False)
    password_hash = db.Column(db.String(255), nullable=False)

    is_admin = db.Column(db.Boolean, default=False) #by default admin going to be False
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}"