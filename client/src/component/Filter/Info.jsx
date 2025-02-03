import PropTypes from "prop-types";
import { useMemo } from "react";
const Info = ({ clusters, minUsers, minProjects }) => {
  const metrics = useMemo(() => {
    let totalUsers = 0,
      totalProjects = 0,
      totalClusters = 0,
      TotalLeads = 0;
    clusters.forEach((element) => {
      if (element.users >= minUsers && element.projects >= minProjects) {
        totalUsers += element.users;
        totalProjects += element.projects;
        totalClusters += 1;
        TotalLeads += element.leads;
      }
    });
    return {
      totalUsers,
      totalProjects,
      totalClusters,
      TotalLeads,
    };
  }, [clusters, minUsers, minProjects]);
  const columnCss = "py-1";
  return (
    <div className="w-full border border-gray-200 rounded-xl px-3 py-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className={columnCss} colSpan={2}>
              Results
            </th>
          </tr>
        </thead>
        {metrics.totalClusters > 0 ? (
          <tbody>
            <tr>
              <td className={columnCss}>Users:</td>
              <td className="text-right font-[700]">{metrics.totalUsers}</td>
            </tr>
            <tr className="p-2">
              <td className={columnCss}>Projects:</td>
              <td className="text-right font-[700]">{metrics.totalProjects}</td>
            </tr>
            <tr className="p-2">
              <td className={columnCss}>Clusters:</td>
              <td className="text-right font-[700]">{metrics.totalClusters}</td>
            </tr>
            <tr className="p-2">
              <td className={columnCss}>Leads:</td>
              <td className="text-right font-[700]">{metrics.TotalLeads}</td>
            </tr>
            <tr className="p-2">
              <td className={columnCss}>Users per cluster:</td>
              <td className="text-right font-[700]">
                {/* round to 2 decimal places */}
                {Math.round(
                  (metrics.totalUsers / metrics.totalClusters) * 100
                ) / 100}
              </td>
            </tr>
          </tbody>
        ) : (
          //loader
          <tbody>
            <tr className="h-40 text-center">
              <td>Loading...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

Info.propTypes = {
  clusters: PropTypes.array.isRequired,
  minUsers: PropTypes.number.isRequired,
  minProjects: PropTypes.number.isRequired,
};

export default Info;
