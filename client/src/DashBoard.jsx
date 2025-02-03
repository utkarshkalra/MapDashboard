import { useState, useEffect, useMemo } from "react";
import Map from "./component/Map/Map";
import Table from "./component/Table/Table.jsx";
import Filter from "./component/Filter/Filter.jsx";
import Metrics from "./component/Metrics/Metrics.jsx";
import Info from "./component/Filter/Info.jsx";
import AddCluster from "./component/AddCluster/AddCluster";
import ActionButton from "./component/Common/ActionButton.jsx";
// import useLogin from "./Hooks/useLogin";
import { useAuth } from "./context/AuthContext.jsx";
import clusterService from "./services/clusterService.js";

const DashBoard = () => {
  // const { loginData } = useLogin();
  const [minUsers, setMinUsers] = useState(0);
  const [minProjects, setMinProjects] = useState(0);
  const [showAddCluster, setShowAddCluster] = useState(false);
  const [clusters, setClusters] = useState([]);
  const { isAuthenticated } = useAuth();

  const handleFilter = (minUsers, minProjects) => {
    if (minUsers && minUsers > 0) setMinUsers(minUsers);
    if (minProjects && minProjects > 0) setMinProjects(minProjects);
  };

  const filteredData = useMemo(() => {
    return clusters?.filter(
      (cluster) => cluster.users >= minUsers && cluster.projects >= minProjects
    );
  }, [clusters, minUsers, minProjects]);

  const fetchClusters = async () => {
    try {
      console.log("fetching clusters called");
      const data = await clusterService.getClusters();
      setClusters(data);
    } catch (error) {
      console.error("Failed to fetch clusters:", error);
    }
  };

  useEffect(() => {
    fetchClusters();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 md:px-10 ">
      <Metrics />

      <div className="map-container w-full h-full rounded-2xl border border-gray-200 shadow bg-gray-50 overflow-hidden mb-6">
        <div className="p-4 md:pe-8 border-b-[1.5px] border-gray-200 text-xl flex justify-between items-center">
          <p>Clusters in India</p>
          {isAuthenticated && (
            <ActionButton onClick={() => setShowAddCluster(true)}>
              Add Cluster +
            </ActionButton>
          )}
        </div>
        <div className="flex flex-col md:flex-row  w-full h-full ">
          <Map clusters={filteredData} />
          <div className="w-full md:w-[25%] px-6 py-3">
            <Filter handleFilter={handleFilter} />
            <Info
              clusters={filteredData}
              minUsers={minUsers}
              minProjects={minProjects}
            />
          </div>
        </div>
      </div>
      <Table clusters={filteredData} />
      {showAddCluster && (
        <AddCluster
          setShowAddCluster={setShowAddCluster}
          refreshClusters={fetchClusters}
        />
      )}
    </div>
  );
};

export default DashBoard;
