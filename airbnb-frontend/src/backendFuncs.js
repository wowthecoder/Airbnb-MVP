import Global from './global';

monthMap = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 0,
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

export { getAreas, checkUserIdExists, createUser };