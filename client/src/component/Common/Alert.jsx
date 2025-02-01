import PropTypes from "prop-types";
import { useEffect } from "react";
const Alert = ({ alert, hideAlert }) => {
  useEffect(() => {
    setTimeout(() => {
      hideAlert();
    }, 3000);
  }, [hideAlert]);
  // alert should slide in and out
  return (
    <div
      className={`text-center text-xs border border-${
        alert.type === "success" ? "green" : "red"
      }-500 animate-slide-in rounded-lg text-${
        alert.type === "success" ? "green" : "red"
      }-500 p-2 my-3 w-fit float-right relative`}
    >
      {alert.text}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  hideAlert: PropTypes.func.isRequired,
};

export default Alert;
