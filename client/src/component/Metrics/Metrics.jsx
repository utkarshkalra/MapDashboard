import { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import useFetchData from "../../Hooks/useFetchData";
import { PiUsersThree } from "react-icons/pi";
import { GoProjectRoadmap, GoPerson } from "react-icons/go";
import { PiChartPieSlice } from "react-icons/pi";

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const { data, loading, error } = useFetchData("/metrics");

  useEffect(() => {
    if (data && data.length > 0) {
      setMetrics(data[0]);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex w-full min-h-[270px] md:min-h-[140px] my-3 md:my-6 flex-wrap md:flex-nowrap">
      <MetricCard
        label="Total Leads"
        metric={metrics?.total_leads}
        classes="ml-0"
        icon={<GoPerson />}
      />
      <MetricCard
        label="Total Users"
        metric={metrics?.total_users}
        icon={<PiUsersThree />}
        classes="mr-0 md:mr-[1.33%]"
      />
      <MetricCard
        label="Total Projects"
        metric={metrics?.total_projects}
        icon={<GoProjectRoadmap />}
        classes="ml-0 md:ml-[1.33%]"
      />
      <MetricCard
        label="Average User Per Cluster"
        metric={(metrics.total_users * 1.0) / metrics.total_clusters}
        classes="mr-0 "
        icon={<PiChartPieSlice />}
      />
    </div>
  );
};

export default Metrics;
