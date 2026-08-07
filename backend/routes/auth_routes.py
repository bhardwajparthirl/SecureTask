from flask import Blueprint, request
from database import SessionLocal
from models.user import User
from flask_jwt_extended import create_access_token

import bcrypt

auth_bp = Blueprint("auth", __name__)



@auth_bp.route("/register",methods=["POST"])
def register():

  # 1. Get JSON
  data=request.json

  # 2. Extract fields
  username=data.get("username")
  email=data.get("email")
  password=data.get("password")

  # 3. Validate input
  if not username:
    return {"error": "Username is required"},400
  if not email:
    return {"error": "Email is required"},400
  if not password:
    return {"error": "Password is required"},400

  # 4.Open DB Session
  db = SessionLocal()

  # 5.Check duplicate email
  existing_user=(
    db.query(User)
    .filter(User.email == email)
    .first()
  )

  if existing_user:
    db.close()
    return {
      "error": "Email already registered"
    },400

  # 6.Hash password
  hashed_password = bcrypt.hashpw(
    password.encode("utf-8"),
    bcrypt.gensalt()
  )

  # 7.Create user
  new_user=User(
    username=username,
    email=email,
    password=hashed_password.decode("utf-8")
  )

  # 8.Save User
  db.add(new_user)
  db.commit()
  db.close()

  # 9.Success Response
  return {
    "message": "User registered successfully"
  },201

@auth_bp.route("/login",methods=["POST"])
def login():

  # 1.Get JSON
  data=request.json

  # 2.Extract fields
  email=data.get("email")
  password=data.get("password")

  # 3.Validate
  if not email:
    return { 
      "error" : "Email is required"
      },400
  if not password:
    return {
       "error" : "password is required"
       },400

  # 4.Open DB Session
  db = SessionLocal()

  # 5.Find User
  user=(
    db.query(User)
    .filter(User.email == email)
    .first()
  )

  # 6.Check email
  if not user:
    db.close()
    return {
      "error" : "Invalid email or password"
    },401

  # 7.Check password
  if not bcrypt.checkpw(
    password.encode("utf-8"),
    user.password.encode("utf-8")
  ):
      db.close()
      return {
        "error" : "Invalid email or password"
      },401
  db.close()

  # 8.create access token
  access_token = create_access_token(identity=str(user.id))

  # 8.Success Response
  return {
    "message" : "Login Successful",
    "access_token" : access_token
  },200
