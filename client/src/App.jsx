import "./App.css";
import "leaflet/dist/leaflet.css";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import DashBoard from "./DashBoard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="App w-screen h-fit bg-blue-50">
        <Header />
        <DashBoard />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
