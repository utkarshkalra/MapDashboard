import "./App.css";
import "leaflet/dist/leaflet.css";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import DashBoard from "./DashBoard.jsx";
import { useState, createContext, useEffect } from "react";

export const LoginContext = createContext();

function App() {
  const [loginData, setLoginData] = useState({
    isLoggedIn: false,
    userName: "",
    token: "",
  });
  const saveLoginData = (data) => {
    console.log("logging in", data);
    if (data.status === 200) {
      setLoginData({
        isLoggedIn: true,
        userName: data.username,
        token: data.token,
      });
      localStorage.setItem("loginData", JSON.stringify(data));
    } else {
      setLoginData({
        isLoggedIn: false,
        userName: "",
      });
      localStorage.removeItem("loginData");
    }
  };

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");

    if (loginData) {
      saveLoginData(JSON.parse(loginData));
    }
  }, []);
  return (
    <LoginContext.Provider value={{ loginData, saveLoginData }}>
      <div className="App w-screen h-fit bg-blue-50">
        <Header />
        <DashBoard />
        <Footer />
      </div>
    </LoginContext.Provider>
  );
}

export default App;
