import { useState } from "react";
import Login from "./Login";
import ActionButton from "./Common/ActionButton";
import { IoLogInOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

import useLogin from "../Hooks/useLogin";
import LogOut from "./LogOut";
const Header = () => {
  const { loginData } = useLogin();
  const [showLogin, setShowLogin] = useState(false);
  const loginClickHandler = () => {
    setShowLogin(true);
  };
  return (
    <div className="w-screen p-5 shadow bg-gray-50 flex justify-between items-center">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 inline-block text-transparent bg-clip-text">
        Analytics Dashboard
      </h3>
      <ActionButton onClick={loginClickHandler}>
        {loginData.isLoggedIn ? (
          <div className="flex items-center gap-2">
            <FaRegUserCircle />
            {loginData.userName}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Login as admin
            <IoLogInOutline />
          </div>
        )}
      </ActionButton>
      {showLogin && (
        <>
          {loginData.isLoggedIn ? (
            <LogOut setShowLogin={setShowLogin} />
          ) : (
            <Login setShowLogin={setShowLogin} />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
