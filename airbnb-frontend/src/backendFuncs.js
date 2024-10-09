import Global from './global';

monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
};

const getAreas = async (setAreaDesc) => {
    try {
      const response = await fetch(`${Global.backendServerUrl}/areas`);
      const areaList = await response.json();
      console.log("Area list:", areaList);
      setAreaDesc(areaList);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAreaDesc([]);
    }
};

const getProperties = async (setProperties) => {
    try {
        const response = await fetch(`${Global.backendServerUrl}/properties`);
        const propList = await response.json();
        setProperties(propList);
    } catch (error) {
        console.error("Error fetching data:", error);
        setProperties([]);
    }
};

const checkUserIdExists = async (userid) => {
    try {
        const response = await fetch(`${Global.backendServerUrl}/checkIdExists/${userid}`);
        const res = await response.json();
        console.log(res);
        return (res.length == 1);
    } catch (error) {
        console.error("Error fetching data:", error);
        return false;
    }
}

const createUser = async (userid) => {
    try {
        const response = await fetch(`${Global.backendServerUrl}/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
            }),
        });
        const res = await response.json();
        console.log(res["message"]);
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

// Pre-condition: user exists
const getUserStats = async (userid, setStats) => {
    try {
        const response = await fetch(`${Global.backendServerUrl}/getUserStats/${userid}`);
        // data is [month number, money] 
        const data = await response.json();
        const monthNum = data[0];
        const moneyStr = data[1].toLocaleString("en-GB", {style: "currency", currency: "GBP"});
        res = [monthMap[monthNum], null, moneyStr];
        if (monthNum < 4) {
            res[1] = Global.winterIcon;
        } else if (monthNum < 7) {
            res[1] = Global.springIcon;
        } else if (monthNum < 10) {
            res[1] = Global.summerIcon;
        } else {
            res[1] = Global.autumnIcon;
        }
        setStats(res);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const getOwnedProperties = async (userid, setProperties) => {    
    try {
        const response = await fetch(`${Global.backendServerUrl}/getPropertiesOwned/${userid}`);
        const res = await response.json();
        setProperties(res);
    } catch (error) {
        console.error("Error fetching data:", error);
        setProperties([]);
    }
}

const calcMonthlyFinances = async (userid, month) => {
    res = {
        "num_guests": [0] * 3,
        "rental_income": 0,
        "expenses": 0,
        "net_cash_flow": income - expenses,
        "property_value": 0,
    }
    try {
        const response = await fetch(`${Global.backendServerUrl}/calculateMonthlyStats/${userid}/${month}`);
        const res = await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    return res;
}

const buyProperty = async (userid, propertyid, rent, mortgage, insurance, deduction) => {
    try {
        const response = await fetch(`${Global.backendServerUrl}/buyProperty`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
                propertyid: propertyid,
                rent: rent,
                mortgage: mortgage,
                insurance: insurance,
                deduction: deduction,
            }),
        });
        const res = await response.json();
        console.log(res);
    } catch (error) {
        console.error("Error buying property:", error);
    }
}

// Pre-condition: user owns the property
const setRentalPrice = async (userid, propertyid, price) => {
    try {
        const response = await fetch(`${Global.backendServerUrl}/setRentalPrice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: userid,
                propertyid: propertyid,
                rent: price,
            }),
        });
        const res = await response.json();
        console.log(res["message"]);
    } catch (error) {
        console.error("Error setting rental price:", error);
    }
}

const getEventInMonth = async (month) => {
    try {
        const response = await fetch(`${Global.backendServerUrl}/events/${month}`);
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export { getAreas, getProperties, checkUserIdExists, createUser, getUserStats,
    getOwnedProperties, buyProperty, setRentalPrice, getEventInMonth };