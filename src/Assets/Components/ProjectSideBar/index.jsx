import { Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Project_Data } from "../const";

const ProjectSideBar = () => {
  // useEffect for scroll visibility and cleanup
  useEffect(() => {});

  const [activeTitle, setActiveTitle] = useState("");

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
        <Link
          key={data.title}
          to={data.title}
          spy={true}
          smooth={true}
          offset={-70} // Adjust the offset based on your layout
          duration={500}
          onSetActive={() => setActiveTitle(data.title)}
        >
          <Fab
            variant="extended"
            color={data.title === activeTitle ? "primary" : "default"}
            sx={{
              my: "4px",
              width: 290,
            }}
          >
            <p className="text-[15px] ">{data.title}</p>
          </Fab>
        </Link>
      ))}
    </div>
  );
};

export default ProjectSideBar;
