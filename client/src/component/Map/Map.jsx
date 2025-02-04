import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { isMobile } from "../../Utils.js";
import PropTypes from "prop-types";
import CustomPopup from "./Popup.jsx";

const Map = ({ clusters }) => {
  return (
    <div className="w-full md:w-[75%] h-[370px]">
      <MapContainer
        center={[22.3605, 78.6919]}
        zoom={7}
        scrollWheelZoom={!isMobile()}
        touchZoom={isMobile()}
        // className="h-[calc(100vh-4rem)] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clusters?.map((cluster) => (
          <Marker
            key={cluster.id}
            position={[cluster.location.latitude, cluster.location.longitude]}
          >
            <CustomPopup cluster={cluster} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  clusters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
      users: PropTypes.number.isRequired,
      projects: PropTypes.number.isRequired,
      leads: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Map;
