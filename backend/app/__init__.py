from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    db.init_app(app)
    migrate.init_app(app,db)
    
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)
    
    from app.models import user
    
    @app.route("/health")
    def health_check():
        return {"status": "ok"}
    
    return app