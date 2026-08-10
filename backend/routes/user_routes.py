from flask import Blueprint
from database import SessionLocal
from models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint("user", __name__)

@user_bp.route("/users")
def get_users():

  db=SessionLocal()

  users=db.query(User).all()

  result=[]

  for user in users:
    result.append({
      "id": user.id,
      "username": user.username,
      "email": user.email
    })

  db.close()

  return result

@user_bp.route("/profile",methods=["GET"])
@jwt_required()
def profile():

  db = SessionLocal()

  user_id = get_jwt_identity()

  user = (
    db.query(User)
    .filter(User.id == int(user_id))
    .first()
  )

  if not user:
    db.close()
    return {
      "message" : "User not found"
    }, 404
  
  result = {
    "id" : user.id,
    "username" : user.username,
    "email" : user.email
  }

  db.close()

  return result, 200
