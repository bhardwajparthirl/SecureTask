from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route("/")

def home():
  return {"message": "Hello Parthak"}

@app.route("/greet",methods=["POST"])

def greet():

  data = request.json
  name=data.get("name")

  return {
    "message": f"Hello {name}"
  }
if __name__ == "__main__":
  app.run(debug=True)