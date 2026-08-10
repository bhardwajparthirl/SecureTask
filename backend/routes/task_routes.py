from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import SessionLocal
from models.task import Task

task_bp = Blueprint("task",__name__)

@task_bp.route("/tasks",methods=["POST"])
@jwt_required()

# CREATE TASK------
def create_task():

  data=request.json

  title = data.get("title")
  description = data.get("description")
  category = data.get("category")
  status = data.get("status")

# VALIDATION --------

  if not title:
    return { "error" : "Title is required"},400


# Get Logged-in user's ID from JWT
  user_id=get_jwt_identity()

  db = SessionLocal()

  new_task = Task(
    title=title,
    description=description,
    category=category,
    status=status or "Pending",
    user_id=int(user_id)
  )

  db.add(new_task)

  db.commit()

#Get database-generated values
  db.refresh(new_task)

  db.close()

  return {
    "message" : "Task created successfully",
    "task" : {
      "id" : new_task.id,
      "title" : new_task.title,
      "description" : new_task.description,
      "category" : new_task.category,
      "status" : new_task.status,
      "user_id" : new_task.user_id
    }
  },201

# GET TASKS + SEARCH ---------

@task_bp.route("/tasks",methods=["GET"])
@jwt_required()
def get_tasks():

  db = SessionLocal()

 # Get logged-in user's ID
  user_id = get_jwt_identity()

 # Start query with user's own tasks only
  query = (
    db.query(Task)
    .filter(Task.user_id == int(user_id))
    )

 # Get optional search parameter
  search = request.args.get("search")

 # Search by title
  if search:
    query = query.filter(
      Task.title.ilike(f"%{search}%")
    )

  tasks = query.all()

  #Search by category
  category = request.args.get("category")

  if category:
    query = query.filter(
        Task.category.ilike(category)
    )

  tasks = query.all()


  result = []

  for task in tasks:
    result.append({
      "id" : task.id,
      "title" : task.title,
      "description" : task.description,
      "category" : task.category,
      "status" : task.status,
      "created_at" : task.created_at
    })

    db.close()

  return result

# UPDATE TASK---------

@task_bp.route("/tasks/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
  db = SessionLocal()

# Get logged-in user's ID
  user_id = get_jwt_identity()

 # Find task belonging to this user
  task = (
    db.query(Task)
    .filter(
      Task.id == task_id,
      Task.user_id == int(user_id)
    )
    .first()
  )

  if not task:
    return {"messsage" : "Task not found or not authorised"}, 404

  data = request.json

  task.title = data.get("title", task.title)
  task.description = data.get("description", task.description)
  task.category = data.get("category", task.category)
  task.status = data.get("status", task.status)
  

  db.commit()
  db.refresh(task)

  result = {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "category": task.category,
        "status": task.status,
        "created_at": task.created_at
    }

  db.close()

  return {
        "message": "Task updated successfully",
        "task": result
    }, 200


#DELETE TASK ----------

@task_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):

  db = SessionLocal()

 # Get logged-in user's ID
  user_id = get_jwt_identity()

# Find task belonging to this user
  task = (
    db.query(Task)
    .filter(
    Task.id == task_id,
    Task.user_id == int(user_id)
    ).first()
  )

  if not task:
     return {"messsage" : "Task not found or not authorised"}, 404

  db.delete(task)

  db.commit()

  db.close()

  return {
          "message": "Task Deleted successfully",
      }, 200

# DASHBOARD

@task_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():

  db = SessionLocal()

  user_id = get_jwt_identity()

  tasks = (
    db.query(Task)
    .filter(Task.user_id == int(user_id))
    .all()
  )

  total_tasks = 0
  pending = 0
  in_progress = 0
  completed = 0

  for task in tasks:
    total_tasks +=1

    if task.status == "Pending":
      pending +=1

    elif task.status == "In Progress":
      in_progress +=1

    elif task.status == "Completed":
      completed +=1

      db.close()

  return {
        "total_tasks" : total_tasks,
        "pending" : pending,
        "in_progress" : in_progress,
        "completed" : completed
      }, 200