import PropTypes from "prop-types";

const ActionButton = ({ children, onClick, filled }) => {
  return (
    <button
      className={`border-blue-500 text-blue-500 border-2  px-4 py-1 text-sm rounded-3xl hover:transform hover:scale-105 transition-all duration-300 ${
        filled
          ? "bg-blue-500 text-white"
          : filled === undefined
          ? "hover:bg-blue-500 hover:text-white transition-all duration-300"
          : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  filled: PropTypes.bool,
};

export default ActionButton;
