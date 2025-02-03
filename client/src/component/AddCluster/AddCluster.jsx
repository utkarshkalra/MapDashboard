import { useState } from "react";
import Modal from "../Common/Modal";
import FloatingInput from "../Common/FloatingInput";
import Alert from "../Common/Alert";
import ActionButton from "../Common/ActionButton";
import PropTypes from "prop-types";
import clusterService from "../../services/clusterService";
import { useAuth } from "../../context/AuthContext.jsx";

const AddCluster = ({ setShowAddCluster, refreshClusters }) => {
  const { isAuthenticated } = useAuth();
  const [clusterData, setClusterData] = useState({
    name: "",
    location: {
      latitude: "",
      longitude: "",
    },
    users: "",
    projects: "",
    leads: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    text: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "latitude" || id === "longitude") {
      setClusterData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [id]: value,
        },
      }));
    } else {
      setClusterData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleAddCluster = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setAlert({
        show: true,
        text: "Please login first",
        type: "error",
      });
      return;
    }

    // Validate all fields are filled
    const isValid =
      Object.values(clusterData).every(
        (value) => value !== "" && value !== null
      ) &&
      Object.values(clusterData.location).every(
        (value) => value !== "" && value !== null
      );

    if (!isValid) {
      setAlert({
        show: true,
        text: "Please fill all fields",
        type: "error",
      });
      return;
    }

    try {
      await clusterService.addCluster(clusterData);
      setAlert({
        show: true,
        text: "Cluster added successfully",
        type: "success",
      });
      refreshClusters();
      setTimeout(() => setShowAddCluster(false), 1000);
    } catch (error) {
      setAlert({
        show: true,
        text: error.response?.data?.detail || "Failed to add cluster",
        type: "error",
      });
    }
  };

  return (
    <Modal>
      <div className="bg-gray-50 p-4 rounded-lg w-[350px] relative">
        <h2 className="text-xl text-center font-bold pt-3 pb-4">Add Cluster</h2>
        <form>
          <FloatingInput
            label="Name"
            id="name"
            onChange={handleChange}
            type="text"
          />
          <FloatingInput
            label="Latitude"
            id="latitude"
            onChange={handleChange}
            type="number"
          />
          <FloatingInput
            label="Longitude"
            id="longitude"
            onChange={handleChange}
            type="number"
          />
          <FloatingInput
            label="Users"
            id="users"
            onChange={handleChange}
            type="number"
          />
          <FloatingInput
            label="Projects"
            id="projects"
            onChange={handleChange}
            type="number"
          />
          <FloatingInput
            label="Leads"
            id="leads"
            onChange={handleChange}
            type="number"
          />
          <div className="flex gap-2 my-3 justify-end">
            <ActionButton
              type="submit"
              filled={true}
              onClick={handleAddCluster}
            >
              Add
            </ActionButton>
            <ActionButton
              type="button"
              filled={false}
              onClick={() => setShowAddCluster(false)}
            >
              Cancel
            </ActionButton>
          </div>
        </form>
        <button
          className="border border-gray-400 text-gray-400 px-[8px] py-1 rounded-lg text-xs absolute top-4 right-4 hover:transform hover:rotate-180 transition-all duration-300"
          onClick={() => setShowAddCluster(false)}
        >
          X
        </button>
        {alert.show && (
          <Alert
            alert={alert}
            hideAlert={() => setAlert((prev) => ({ ...prev, show: false }))}
          />
        )}
      </div>
    </Modal>
  );
};

AddCluster.propTypes = {
  setShowAddCluster: PropTypes.func.isRequired,
  refreshClusters: PropTypes.func.isRequired,
};

export default AddCluster;
