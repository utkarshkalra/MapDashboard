import "./App.css";
import "leaflet/dist/leaflet.css";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import DashBoard from "./DashBoard.jsx";

function App() {
  return (
    <div className="App w-screen h-fit bg-blue-50">
      <Header />
      <DashBoard />
      <Footer />
    </div>
  );
}

export default App;
