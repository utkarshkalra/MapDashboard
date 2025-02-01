import PropTypes from "prop-types";

const MetricCard = ({ label, metric, classes, icon }) => {
  return (
    <div
      className={`w-[48%] md:w-[23%] shadow mx-[2%] md:mx-[1.33%] rounded-xl p-4 md:p-6 min-h-full relative bg-gray-50 mb-3 text-gray-500 ${
        classes ?? ""
      } 
        `}
    >
      <p className="text-md md:text-lg font-semibold items-start absolute top-4">
        {label}
      </p>
      <h3 className="text-3xl md:text-[2.8rem] font-semibold absolute bottom-5 text-gray-700">
        {metric}
      </h3>
      <div className="absolute bottom-3 right-3 md:bottom-5 md:right-8  text-sm md:text-xl rounded-full bg-blue-100 p-1.5 md:p-2">
        {icon}
      </div>
    </div>
  );
};

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  metric: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  classes: PropTypes.string,
  icon: PropTypes.element.isRequired,
};

export default MetricCard;
