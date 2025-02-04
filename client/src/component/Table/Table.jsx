import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Table = ({ clusters }) => {
  const PAGESIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * PAGESIZE;
  const indexOfFirstItem = indexOfLastItem - PAGESIZE;
  const currentItems = clusters?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [clusters]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    setCurrentPage(
      currentPage < clusters.length / PAGESIZE ? currentPage + 1 : currentPage
    );
  };

  //add pagination
  return (
    <div className="relative overflow-x-auto overflow-y-hidden shadow-md rounded-lg w-full h-fit">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500  table-auto">
        <thead className="text-xl font-bold text-gray-700  bg-gray-50 border-b border-gray-200 ">
          <tr align="left md:center">
            <td colSpan="7" className="px-6 py-3">
              {" "}
              Individual Cluster data{" "}
            </td>
          </tr>
        </thead>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Users
            </th>
            <th scope="col" className="px-6 py-3">
              Projects
            </th>
            <th scope="col" className="px-6 py-3">
              Leads
            </th>
            <th scope="col" className="px-6 py-3">
              Latitude
            </th>
            <th scope="col" className="px-6 py-3">
              Longitude
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 ? (
            <>
              {currentItems?.map((cluster) => (
                <tr
                  className="bg-white border-b  border-gray-200 hover:bg-gray-50 text-center md:text-left"
                  key={cluster.id}
                >
                  <td className="px-2 py-2 md:px-6 md:py-3 ">{cluster.id}</td>
                  <td className="px-2 py-2 md:px-6 md:py-3 ">{cluster.name}</td>
                  <td className="px-2 py-2 md:px-6 md:py-3 ">
                    {cluster.users}
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-3 ">
                    {cluster.projects}
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-3 ">
                    {cluster.leads}
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-3 ">
                    {cluster.location.latitude}
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-3 ">
                    {cluster.location.longitude}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr
              className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
              align="center"
            >
              <td colSpan="7" className="px-6 py-3">
                No clusters found
              </td>
            </tr>
          )}
        </tbody>

        {clusters?.length > 0 && (
          <tfoot>
            <tr className="bg-white ">
              <td colSpan="7">
                <div className=" flex justify-start md:justify-end ">
                  <div className="flex justify-center items-center px-4">
                    <p>
                      {" "}
                      {indexOfFirstItem + 1} - {indexOfLastItem} of{" "}
                      {clusters.length}
                    </p>
                  </div>
                  <div>
                    <div className=" py-3  border-gray-200 h-full inline-block">
                      <button
                        className="py-2.5 px-4 text-sm font-medium  focus:outline-none bg-white rounded-3xl border border-blue-500 hover:bg-gray-100 text-blue-500 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                        onClick={handlePreviousPage}
                      >
                        Previous
                      </button>
                    </div>
                    <div className=" mx-2 py-3  h-full inline-block">
                      <button
                        className="rounded-3xl text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5  focus:outline-none "
                        onClick={handleNextPage}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

Table.propTypes = {
  clusters: PropTypes.array.isRequired,
};

export default Table;
