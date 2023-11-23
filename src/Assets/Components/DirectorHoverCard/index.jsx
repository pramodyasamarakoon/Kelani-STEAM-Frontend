import React from "react";
import Paper from "@mui/material/Paper";
import { videCommittee, presidents } from "../const";

const DirectorHoverCard = (img) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        width: { xs: "150px", md: "250px" },
        height: { xs: "200px", md: "310px" },
        transition: "200ms",
        "&:hover": {
          width: { xs: "145px", md: "245px" },
          height: { xs: "195px", md: "305px" },
        },
        background: `url(${presidents[1].img})`,
        backgroundSize: "cover", // Adjust as needed
        backgroundPosition: "center", // Adjust as needed
        borderRadius: "32px",
        // background: #ffffff;
        boxShadow: "5px 5px 15px #000000",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 102,
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          borderRadius: "20px",
          transition: "700ms",
        }}
      >
        {/* <p id="prompt">HOVER OVER :D</p> */}
      </div>
    </Paper>
  );
};

export default DirectorHoverCard;
