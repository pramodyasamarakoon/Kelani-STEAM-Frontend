import { Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Project_Data } from "../const";

const ProjectSideBar = ({ data }) => {
  // useEffect for scroll visibility and cleanup
  useEffect(() => {});

  const [activeTitle, setActiveTitle] = useState("");

  return (
    <div
      className="hidden md:flex"
      style={{
        position: "fixed",
        top: "50%",
        right: "0.1%",
        flexDirection: "column",
        zIndex: 999,
        transform: "translate(-50%, -50%)",
      }}
    >
      {data.map((data) => (
        <Link
          key={data.Id}
          to={data.ProjectName}
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          onSetActive={() => setActiveTitle(data.Id)}
        >
          <Fab
            variant="extended"
            color={data.Id === activeTitle ? "primary" : "default"}
            size="small"
            sx={{
              my: "4px",
              width: 220,
            }}
          >
            <p className="text-[12px] ">{data.ProjectName}</p>
          </Fab>
        </Link>
      ))}
    </div>
  );
};

export default ProjectSideBar;
