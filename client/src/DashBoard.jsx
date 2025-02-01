import { useState, useMemo } from "react";
import Map from "./component/Map/Map.jsx";
import Table from "./component/Table/Table.jsx";
import Filter from "./component/Filter/Filter.jsx";
import Metrics from "./component/Metrics/Metrics.jsx";
import useFetchData from "./Hooks/useFetchData";
import Info from "./component/Filter/Info.jsx";
import AddCluster from "./component/AddCluster/AddCluster.jsx";
import ActionButton from "./component/Common/ActionButton.jsx";
import useLogin from "./Hooks/useLogin";
const DashBoard = () => {
  const { loginData } = useLogin();
  const { data, loading, error } = useFetchData("/data");
  const [minUsers, setMinUsers] = useState(0);
  const [minProjects, setMinProjects] = useState(0);
  const [showAddCluster, setShowAddCluster] = useState(false);
  const handleFilter = (minUsers, minProjects) => {
    if (minUsers && minUsers > 0) setMinUsers(minUsers);
    if (minProjects && minProjects > 0) setMinProjects(minProjects);
  };

  const filteredData = useMemo(() => {
    return data?.filter(
      (cluster) => cluster.users >= minUsers && cluster.projects >= minProjects
    );
  }, [data, minUsers, minProjects]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 md:px-10 ">
      <Metrics />

      <div className="map-container w-full h-full rounded-2xl border border-gray-200 shadow bg-gray-50 overflow-hidden mb-6">
        <div className="p-4 md:pe-8 border-b-[1.5px] border-gray-200 text-xl flex justify-between items-center">
          <p>Clusters in India</p>
          {loginData.isLoggedIn && (
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
      {showAddCluster && <AddCluster setShowAddCluster={setShowAddCluster} />}
    </div>
  );
};

export default DashBoard;
