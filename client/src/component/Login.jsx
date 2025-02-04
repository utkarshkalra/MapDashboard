import Modal from "./Common/Modal.jsx";
import FloatingInput from "./Common/FloatingInput.jsx";
import { useState } from "react";
import PropTypes from "prop-types";
import Alert from "./Common/Alert.jsx";
import ActionButton from "./Common/ActionButton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = ({ setShowLogin }) => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    text: "",
    type: "success",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setAlert({
        show: true,
        text: "Please fill all fields",
        type: "error",
      });
      return;
    }

    try {
      await login(credentials);
      setAlert({
        show: true,
        text: "Login successful",
        type: "success",
      });
      setTimeout(() => setShowLogin(false), 500);
    } catch {
      setAlert({
        show: true,
        text: "Login failed",
        type: "error",
      });
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Modal>
      <div className="bg-gray-50 p-4 rounded-lg w-[350px] relative">
        <h2 className="text-xl text-center font-bold pt-3 pb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <FloatingInput
            label="Username"
            id="username"
            onChange={handleChange}
            type="text"
          />
          <FloatingInput
            label="Password"
            id="password"
            onChange={handleChange}
            type="password"
          />
          <div className="flex gap-2 my-3 justify-end">
            <ActionButton type="submit" filled={true}>
              Login
            </ActionButton>
            <ActionButton
              type="button"
              filled={false}
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </ActionButton>
          </div>
        </form>
        <button
          className="border border-gray-400 text-gray-400 px-[8px] py-1 rounded-lg text-xs absolute top-4 right-4 hover:transform hover:rotate-180 transition-all duration-300"
          onClick={() => setShowLogin(false)}
        >
          X
        </button>
        {alert.show && (
          <Alert
            alert={alert}
            hideAlert={() => setAlert((prev) => ({ ...prev, show: false }))}
          />
        )}
      </div>
    </Modal>
  );
};

Login.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Login;
