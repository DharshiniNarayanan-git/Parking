import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import axios from "axios";
import MapComponent from "./Components/Mapcomponent";
import Directions from "./Components/Directions";
import DrawerCom from "./Components/DrawerCom";
import { mappingData } from "./Common/resmap";
import Graph from "./Components/Graph";
import moment from "moment-timezone";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest, msalConfig } from "./auth/auth-config";
import { PublicClientApplication } from "@azure/msal-browser";
import SignIn from "./Components/SignIn";
import BasicMenu from "./Components/Menu";

export const MapContext = createContext();

const msalInstance = new PublicClientApplication(msalConfig);

const MainContent = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "select_account",
      })
      .then(() => console.log("Redirect successful"))
      .catch((error) => console.log("Login redirect error:", error));
  };

  useEffect(() => {
    const signIn = async () => {
      try {
        await instance.loginRedirect({
          ...loginRequest,
          prompt: "select_account",
        });
      } catch (error) {
        console.error("Login redirect error:", error);
      }
    };

    signIn();
  }, [instance]);

  return isAuthenticated ? <App1 /> : <SignIn redirect={handleRedirect} />;
};

export function App() {
  const [mapdata, setMapData] = useState([]);
  const [homedata, setHomedata] = useState([]);
  const [graphdata, setGraphData] = useState([]);
  const [centerLocation, setCenterLocation] = useState(null);

  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [count, setCount] = useState([]);
  const [date, setDate] = useState(new Date());
  const { instance } = useMsal();

  const getGraphData = async () => {
    const formattedDate = moment(date)
      .tz(moment.tz.guess())
      .format("YYYY-MM-DD");
    console.log("hhhh", formattedDate);

    try {
      const response = await axios.get(
        `https://6aad-2405-201-e060-52-811c-6f7c-2828-5364.ngrok-free.app/api/data?date=${formattedDate}`,
      );

      const data = response.data.map((item) => item.graph_data);
      console.log("respoooo:", data);

      setCount(data);
    } catch (error) {
      // Log the error message
      console.error("Error fetching data:", error.message);

      // Log the full error object to get more details
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    getGraphData();
  }, [date]);

  const get1 = async () => {
    try {
      const response = await axios.get(
        "https://api-gateway.smartbrain.cellnextelecom.com/t/smartbrain.cellnextelecom/ngsi/v3/entities?type=ParkingSpot",
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer 0382f85c-ee60-351e-bf6b-6e3e69fbb1be",
          },
        },
      );

      if (response) {
        console.log("newMapdata", response.data);
        const mappedDataArray = response.data.map((item) => mappingData(item));
        setMapData(mappedDataArray);
        console.log("Mapped Data:", mappedDataArray);
        getCenter(mappedDataArray);
      }
    } catch (error) {
      console.log("Error in Response", error);
    }
  };

  const getCenter = (data) => {

    try {
      let totalLongitude = 0;
      let totalLatitude = 0;
      let coordinateCount = 0;

      data.forEach((element) => {
        const [longitude, latitude] = element.geometry.coordinates;

        totalLongitude += longitude;
        totalLatitude += latitude;
        coordinateCount += 1;
      });

      const centerLongitude = totalLongitude / coordinateCount;
      const centerLatitude = totalLatitude / coordinateCount;

      // setCenterLocation({ lat: centerLatitude, lng: centerLongitude });
      setCenterLocation({
        lat: 13.05552,
        lng: 80.25534,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const get = async () => {
    try {
      const token = localStorage.getItem("token");

      // const response = await axios.get("http://localhost:8080/api/parking",
      const response = await axios.get("https://parkingserver-6onn.onrender.com/api/parking", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response && Array.isArray(response.data)) {
        console.log("New data:", response.data);
        const mappedDataArray = response.data.map((item) => {
          const mappedItem = mappingData(item);
          console.log("Mapped Item:", mappedItem);
          return mappedItem;
        });
        console.log("Mapped Data Array:", mappedDataArray);

        // Update map data only if it has changed
        setMapData((prevData) => {
          if (JSON.stringify(prevData) !== JSON.stringify(mappedDataArray)) {
            return mappedDataArray;
          }
          return prevData; // No change, return the same state
        });

        setHomedata(mappedDataArray);
      } else {
        console.error("Response data is not an array or response is undefined");
      }
    } catch (error) {
      console.log("Error in Response:", error);
    }
  };

  useEffect(() => {
    get();
    getCenter(mapdata);
    // const interval = setInterval(() => {
    //   get();
    // }, 60000);

    // return () => clearInterval(interval);
  }, []);

  const graphData = async () => {
    try {
      const response = await axios.get(
        "https://api-gateway.smartbrain.cellnextelecom.com/t/smartbrain.cellnextelecom/ngsi/v3/entities?type=ParkingSpot",
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer 0382f85c-ee60-351e-bf6b-6e3e69fbb1be",
          },
        },
      );

      if (response) {
        console.log("new dataaa", response.data);
        const mappedDataArray = response.data.map((item) => mappingData(item));
        setGraphData(mappedDataArray);
        console.log("Mapped Data:", mappedDataArray);
      }
    } catch (error) {
      console.log("Error in Response", error);
    }
  };

  useEffect(() => {
    const checkLastExecution = () => {
      const lastExecution = localStorage.getItem("lastExecution");
      const now = new Date().getTime();
      const oneHour = 3600000;

      if (!lastExecution || now - lastExecution >= oneHour) {
        // Call get1 if it hasn't been called in the last hour
        graphData();
        localStorage.setItem("lastExecution", now); // Save current time
      }
    };

    // Run check immediately when the component mounts
    checkLastExecution();

    // Set interval for future calls
    const interval = setInterval(
      () => {
        graphData();
        localStorage.setItem("lastExecution", new Date().getTime()); // Save current time
      },
      60 * 60 * 1000,
    );

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const postData = async () => {
    let acount = 0;
    mapdata?.forEach((element) => {
      const { max_capacity, num_spaces_occupied } = element.properties;

      if (max_capacity > num_spaces_occupied) {
        acount += max_capacity - num_spaces_occupied;
      }
    });

    const formattedDate = moment.tz(moment.tz.guess()).format("YYYY-MM-DD");

    const dataToSend = {
      record_date: formattedDate,
      graph_data: acount,
    };
    console.log(dataToSend);

    try {
      const response = await axios.post(
        "https://f1dc-2405-201-e060-52-811c-6f7c-2828-5364.ngrok-free.app/api/data",
        dataToSend,
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    if (mapdata?.length > 0) {
      postData();
    }
  }, [graphdata]);

  const handleLogout = () => instance.logout();

  return (
    <Provider store={store}>
      <MapContext.Provider
        value={{
          routes,
          setRoutes,
          homedata,
          mapdata,
          routeIndex,
          setRouteIndex,
          setAvailableCount,
          availableCount,
          count,
          setDate,
          date,
          handleLogout,
          centerLocation,
        }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="dash" element={<Dashboard />} />
            <Route path="map" element={<MapComponent />} />
            <Route path="Directions" element={<Directions />} />
            <Route path="drawer" element={<DrawerCom />} />
            <Route path="graph" element={<Graph />} />
            <Route path="menu" element={<BasicMenu />} />
          </Routes>
        </HashRouter>
      </MapContext.Provider>
    </Provider>
  );
}

const App1 = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <MainContent />
    </MsalProvider>
  );
};

export default App;
