from app import db
from datetime import date

class Attendance(db.Model):
    __tablename__ = "attendance"
    
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    attendance_date = db.Column(
        db.Date,
        nullable=False,
        default=date.today
    )
    
    __table_args__ = (
        db.UniqueConstraint(
            "user_id",
            "attendance_date",
            name="unique_user_date"
        ),
    )