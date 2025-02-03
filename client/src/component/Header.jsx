import { useState } from "react";
import Login from "./Login";
import { useAuth } from "../context/AuthContext.jsx";
import ActionButton from "./Common/ActionButton.jsx";
import Logout from "./Logout";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="w-full h-16 bg-white shadow-md flex justify-between items-center px-8">
      <div className="text-xl font-bold">Cluster Map</div>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.username}</span>
            <ActionButton onClick={() => setShowLogout(true)}>
              Logout
            </ActionButton>
          </div>
        ) : (
          <ActionButton onClick={() => setShowLogin(true)}>Login</ActionButton>
        )}
      </div>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {showLogout && <Logout setShowLogout={setShowLogout} />}
    </div>
  );
};

export default Header;
