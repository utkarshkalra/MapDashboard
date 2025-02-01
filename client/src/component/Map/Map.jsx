import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import CustomPopup from "./Popup";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { isMobile } from "../../Utils";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({ clusters, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full md:w-[75%] h-[370px]">
      <MapContainer
        center={[22.3605, 78.6919]}
        zoom={7}
        scrollWheelZoom={!isMobile()}
        touchZoom={isMobile()}
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
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default Map;
