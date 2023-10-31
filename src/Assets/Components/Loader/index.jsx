import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loader;
