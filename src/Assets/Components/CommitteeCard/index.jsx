import React from "react";
import Paper from "@mui/material/Paper";
import { videCommittee } from "../const";

const CommitteeCard = ({ img }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        width: "150px",
        height: "150px",
        transition: "200ms",
        "&:hover": {
          width: "195px",
          height: "195px",
        },
        background: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "250px",
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

export default CommitteeCard;
