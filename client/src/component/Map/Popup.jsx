import { Tooltip } from "react-leaflet";
import PropTypes from "prop-types";

const CustomPopup = ({ cluster }) => {
  return (
    <Tooltip riseOnHover={true}>
      <p className="font-bold border-b-1 mb-1.5">{cluster.name}</p>
      <table>
        <tbody>
          <tr>
            <td>Users</td>
            <td className="text-right font-semibold">{cluster.users}</td>
          </tr>
          <tr>
            <td>Leads</td>
            <td className="text-right font-semibold">{cluster.leads}</td>
          </tr>
          <tr>
            <td>Projects</td>
            <td className="text-right font-semibold">{cluster.projects}</td>
          </tr>
        </tbody>
      </table>
    </Tooltip>
  );
};

CustomPopup.propTypes = {
  cluster: PropTypes.shape({
    name: PropTypes.string.isRequired,
    users: PropTypes.number.isRequired,
    leads: PropTypes.number.isRequired,
    projects: PropTypes.number.isRequired,
  }).isRequired,
};

export default CustomPopup;
