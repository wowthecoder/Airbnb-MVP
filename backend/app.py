from flask import Flask
from queries import connectToDb

app = Flask(__name__)

@app.route('/')
def home():
    return connectToDb()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)