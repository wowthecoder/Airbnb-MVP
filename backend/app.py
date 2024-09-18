from flask import Flask, jsonify
from queries import connectToDb, getAreas, getAllProperties, getAllUserIds, \
    getUserById, getPropertiesOwned, getEventsInMonth, getGraphData, calcMonthlyStats, buyProperty, setRent

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

@app.route('/alluserids')
def allUserIds():
    return jsonify(getAllUserIds())

# This returns the user's current month and money
@app.route('/getUserById/<id>')
def getUserById(id):
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
@app.route('/calculateMonthlyStats/<userid>')
def calculateMonthlyStats(userid):
    return jsonify(calcMonthlyStats(userid))

# This returns the user's cash flow, rental income, and property value up to the current month
@app.route('/graphdata/<userid>')
def graphData(userid):
    return jsonify(getGraphData(userid))

# Precondition: The user has enough money to buy the property (not including insurance and deposit)
@app.route('/buyProperty/<userid>/<propertyid>')
def buyNewProperty(userid, propertyid):
    return buyProperty(userid, propertyid)

# Precondition: user owns the property
@app.route('/setRent/<userid>/<propertyid>/<rent>')
def setNewRent(userid, propertyid, rent):
    return setRent(userid, propertyid, rent)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)