from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from database import engine, Base
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp

from models.user import User
from models.task import Task

from config import DATABASE_URL, JWT_SECRET_KEY

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY

ALLOWED_ORIGINS = [
    "https://secure-task-chi.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

jwt = JWTManager(app)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(task_bp)

@app.route("/")

def home():
  return {"message": "Hello Parthak"}

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    app.run(debug=False)