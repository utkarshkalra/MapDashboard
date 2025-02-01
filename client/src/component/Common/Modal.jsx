import PropTypes from "prop-types";
import { useEffect } from "react";
const Modal = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed z-1000 inset-0 flex items-center justify-center modal bg-opacity-50 overflow-hidden w-screen h-screen">
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
