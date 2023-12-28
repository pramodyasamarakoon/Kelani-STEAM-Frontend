import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({
  size = "3rem",
  className = "flex items-center justify-center",
}) => {
  return (
    <div className={className} sx={{ zIndex: 102 }}>
      <CircularProgress size={size} color="primary" />
    </div>
  );
};

export default Loader;
