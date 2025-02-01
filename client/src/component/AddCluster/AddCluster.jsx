import Modal from "../Common/Modal";
import FloatingInput from "../Common/FloatingInput";
import { useState } from "react";
import PropTypes from "prop-types";
import Alert from "../Common/Alert";
import { api } from "../../services/api";

const AddCluster = ({ setShowAddCluster }) => {
  const [submitData, setSubmitData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    users: "",
    projects: "",
    leads: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const isNullOrempty = (value) => {
    if (value === "" || value === null || value === undefined) {
      return true;
    }
    return false;
  };

  const handleAddCluster = async (e) => {
    e.preventDefault();
    //verify data
    if (
      isNullOrempty(submitData.name) ||
      isNullOrempty(submitData.latitude) ||
      isNullOrempty(submitData.longitude) ||
      isNullOrempty(submitData.users) ||
      isNullOrempty(submitData.projects) ||
      isNullOrempty(submitData.leads)
    ) {
      alertUser();
      return;
    }

    //add cluster
    const newCluster = {
      name: submitData.name,
      location: {
        latitude: submitData.latitude,
        longitude: submitData.longitude,
      },
      users: submitData.users,
      projects: submitData.projects,
      leads: submitData.leads,
    };

    try {
      const response = await api.post("/cluster", newCluster);
      console.log(response.data);
      setAlertText("Cluster added successfully");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlertText("Error adding cluster, kindly try again");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const alertUser = () => {
    setAlertText("Please fill all fields");
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setSubmitData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            onClick={handleAddCluster}
          >
            Add
          </button>
        </form>
        {/* ///make cross spin */}
        <button
          className="border border-gray-400 text-gray-400 px-[8px] py-1 rounded-lg text-xs absolute top-4 right-4 hover:transform hover:rotate-180 transition-all duration-300"
          onClick={() => setShowAddCluster(false)}
        >
          X
        </button>
        {alert && <Alert>{alertText}</Alert>}
      </div>
    </Modal>
  );
};

AddCluster.propTypes = {
  setShowAddCluster: PropTypes.func.isRequired,
};

export default AddCluster;
