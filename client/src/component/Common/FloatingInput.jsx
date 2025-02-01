import PropTypes from "prop-types";
const FloatingInput = ({ label, id, onChange, ref, type }) => {
  return (
    <div className="relative mb-3">
      <input
        type={type}
        id={id}
        className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2b82ca] peer"
        placeholder=" "
        onChange={onChange}
        ref={ref}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50
         px-2 peer-focus:px-2 peer-focus:text-[#2b82ca] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};

FloatingInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  ref: PropTypes.object,
  type: PropTypes.string,
};

export default FloatingInput;
