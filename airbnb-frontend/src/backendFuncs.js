import Global from './global';

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