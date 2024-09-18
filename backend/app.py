from flask import Flask, jsonify
from queries import connectToDb, getAreas

app = Flask(__name__)

@app.route('/')
def home():
    return connectToDb()

@app.route('/areas')
def areas():
    return jsonify(getAreas())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)