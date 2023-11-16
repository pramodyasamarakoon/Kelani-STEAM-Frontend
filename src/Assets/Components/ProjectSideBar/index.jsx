import { Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Project_Data } from "../const";

const ProjectSideBar = () => {
  // useEffect for scroll visibility and cleanup
  useEffect(() => {});

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "0.1%",
        display: "flex",
        flexDirection: "column",
        zIndex: 999,
        transform: "translate(-50%, -50%)",
      }}
    >
      {Project_Data.map((data) => (
        <Fab
          key={data.title}
          variant="extended"
          //   color="primary"
          sx={{
            my: "4px",
            width: 290,
          }}
        >
          {/* <NavigationIcon sx={{ mr: 1 }} /> */}
          <p className="text-[14px] font-OpenSans-Regular">{data.title}</p>
        </Fab>
      ))}
    </div>
  );
};

export default ProjectSideBar;
