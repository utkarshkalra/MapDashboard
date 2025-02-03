import "./App.css";
import "leaflet/dist/leaflet.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import DashBoard from "./DashBoard";
import { AuthProvider } from "./context/AuthContext";

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
