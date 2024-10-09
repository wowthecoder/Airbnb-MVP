from flask import Flask, request, jsonify
from queries import connectToDb, getAreas, getAllProperties, checkUserIdExists, \
    initUser, getUserById, getPropertiesOwned, getEventsInMonth, getGraphData, \
    calcMonthlyStats, buyProperty, setRent

app = Flask(__name__)

@app.route('/')
def home():
    return connectToDb()

@app.route('/areas')
def areas():
    return jsonify(getAreas())

@app.route('/properties')
def properties():
    return jsonify(getAllProperties())

@app.route('/checkIdExists/<id>')
def checkIdExists(id):
    return jsonify(checkUserIdExists(id))

@app.route('/createUser', methods=['POST'])
def createUser():
    data = request.get_json()
    res = initUser(data['userid'])
    if res == "ok":
        return jsonify({"message": "User created"}), 200 
    else:
        return jsonify({"message": res}), 400

# This returns the user's stats (current month number and money)
@app.route('/getUserStats/<id>')
def getUserStats(id):
    return jsonify(getUserById(id))

@app.route('/getPropertiesOwned/<userid>')
def propertiesOwned(userid):
    return jsonify(getPropertiesOwned(userid))

@app.route('/events/<int:month>')
def eventsInMonth(month):
    return jsonify(getEventsInMonth(month))

# Calculate the monthly statistics (net cash flow, rental income, expenses, property value) for the current month
# Update the table
# Return the statistics
@app.route('/calculateMonthlyStats/<userid>/<month>')
def calculateMonthlyStats(userid, month):
    return jsonify(calcMonthlyStats(userid, month))

# This returns the user's cash flow, rental income, and property value up to the current month
@app.route('/graphdata/<userid>')
def graphData(userid):
    return jsonify(getGraphData(userid))

# Precondition: The user has enough money to buy the property (not including insurance and deposit)
@app.route('/buyProperty', methods=['POST'])
def buyNewProperty():
    data = request.get_json()
    return buyProperty(data['userid'], data['propertyid'], data["rent"], data['mortgage'], data['insurance'], data['deduction'])

# # Precondition: user owns the property
@app.route('/setRent', methods=['POST'])
def setNewRent():
    data = request.get_json()
    return setRent(data['userid'], data['propertyid'], data['rent'])


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)