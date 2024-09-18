import Global from './global';

monthMap = {
  "December": 0,
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
  "November": 11
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

export { getAreas };