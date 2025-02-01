import Modal from "./Common/Modal";
import FloatingInput from "./Common/FloatingInput";
import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Alert from "./Common/Alert";
import { api } from "../services/api";
import ActionButton from "./Common/ActionButton";
import useLogin from "../Hooks/useLogin";
const Login = ({ setShowLogin }) => {
  const [submitData, setSubmitData] = useState({
    username: "",
    password: "",
  });

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

  const isNullOrempty = useCallback((value) => {
    if (value === "" || value === null || value === undefined) {
      return true;
    }
    return false;
  }, []);

  const { saveLoginData } = useLogin();

  const LoginUser = async (e) => {
    e.preventDefault();
    //verify data
    if (
      isNullOrempty(submitData.username) ||
      isNullOrempty(submitData.password)
    ) {
      alertUser();
      return;
    }

    try {
      const response = await api.post("/token", submitData);
      if (response.status === 200) {
        setAlert({
          show: true,
          text: "Login successful",
          type: "success",
        });
        setTimeout(() => {
          saveLoginData(response.data);
          setShowLogin(false);
        }, 500);
      } else {
        setAlert({
          show: true,
          text: "Login failed",
          type: "error",
        });
      }
    } catch {
      setAlert({
        show: true,
        text: "Login failed",
        type: "error",
      });
    }
  };

  const alertUser = useCallback(() => {
    setAlert({
      show: true,
      text: "Please fill all fields",
      type: "error",
    });
  }, []);

  const handleChange = (e) => {
    setSubmitData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <Modal>
      <div className="bg-gray-50 p-4 rounded-lg w-[350px] relative">
        <h2 className="text-xl text-center font-bold pt-3 pb-4">Login</h2>
        <form>
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
            <ActionButton filled={true} onClick={LoginUser}>
              Login
            </ActionButton>
            <ActionButton filled={false} onClick={() => setShowLogin(false)}>
              Cancel
            </ActionButton>
          </div>
        </form>
        {/* ///make cross spin */}
        <button
          className="border border-gray-400 text-gray-400 px-[8px] py-1 rounded-lg text-xs absolute top-4 right-4 hover:transform hover:rotate-180 transition-all duration-300"
          onClick={() => setShowLogin(false)}
        >
          X
        </button>
        {alert.show && <Alert alert={alert} hideAlert={hideAlert} />}
      </div>
    </Modal>
  );
};

Login.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Login;
