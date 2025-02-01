import PropTypes from "prop-types";
const Alert = ({ children }) => {
  // alert should slide in and out
  return (
    <div className=" text-center text-xs border border-red-500 animate-slide-in rounded-lg text-red-500 p-2 my-3 w-fit float-right relative">
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Alert;
