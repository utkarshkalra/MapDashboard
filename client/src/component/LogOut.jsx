import Modal from "./Common/Modal";
import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Alert from "./Common/Alert";
import ActionButton from "./Common/ActionButton";
import { useAuth } from "../context/AuthContext";

const Logout = ({ setShowLogout }) => {
  const { logout } = useAuth();

  const [alert, setAlert] = useState({
    show: false,
    text: "",
    type: "success",
  });

  const hideAlert = useCallback(() => {
    setAlert({
      show: false,
      text: "",
      type: "",
    });
  }, []);

  const LogoutUser = () => {
    setAlert({
      show: true,
      text: "Logged out successfully",
      type: "success",
    });
    setTimeout(() => {
      logout();
      setShowLogout(false);
    }, 500);
  };

  return (
    <Modal>
      <div className="bg-gray-50 p-4 rounded-lg w-[350px] relative">
        <h2 className="text-xl text-center font-bold pt-3 pb-4">
          Do you wish to Log out?
        </h2>

        <div className="flex gap-2 my-3 justify-center">
          <ActionButton filled={false} onClick={LogoutUser}>
            Yes
          </ActionButton>
          <ActionButton filled={true} onClick={() => setShowLogout(false)}>
            No
          </ActionButton>
        </div>
        {/* ///make cross spin */}
        <button
          className="border border-gray-400 text-gray-400 px-[8px] py-1 rounded-lg text-xs absolute top-4 right-4 hover:transform hover:rotate-180 transition-all duration-300"
          onClick={() => setShowLogout(false)}
        >
          X
        </button>
        {alert.show && <Alert alert={alert} hideAlert={hideAlert} />}
      </div>
    </Modal>
  );
};

Logout.propTypes = {
  setShowLogout: PropTypes.func.isRequired,
};

export default Logout;
