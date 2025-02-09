import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { isMobile } from "../../Utils.js";
import PropTypes from "prop-types";
import CustomPopup from "./Popup.jsx";
import L from "leaflet";
const Map = ({ clusters }) => {
  const customIcon = L.icon({
    iconUrl: "../../../src/assets/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "../../../src/assets/marker-shadow.png",
    shadowSize: [41, 41],
  });
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
            icon={customIcon}
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
