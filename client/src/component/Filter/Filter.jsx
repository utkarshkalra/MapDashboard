import { useState, useRef } from "react";
import PropTypes from "prop-types";
import FloatingInput from "../Common/FloatingInput";
const Filter = ({ handleFilter }) => {
  const [minUsers, setMinUsers] = useState(0);
  const [minProjects, setMinProjects] = useState(0);
  const userRef = useRef(null);
  const projectRef = useRef(null);

  const handleMinUsers = () => {
    setMinUsers(userRef.current.value);
    handleFilter(userRef.current.value, minProjects);
  };

  const handleMinProjects = () => {
    setMinProjects(projectRef.current.value);
    handleFilter(minUsers, projectRef.current.value);
  };

  return (
    <div className="flex flex-col justify-start">
      <h3 className="mb-2 ps-1">Filter Clusters</h3>
      <FloatingInput
        label="Enter Minimum Users"
        id="user_filter"
        onChange={handleMinUsers}
        ref={userRef}
        type="number"
      />

      <FloatingInput
        label="Enter Minimum Projects"
        id="project_filter"
        onChange={handleMinProjects}
        ref={projectRef}
        type="number"
      />
    </div>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default Filter;
