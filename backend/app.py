from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from database import engine, Base
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "super-secret-key"

CORS(app)

jwt = JWTManager(app)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)

@app.route("/")

def home():
  return {"message": "Hello Parthak"}

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
  app.run(debug=True)