import React from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";

const BackgroundBlur = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backdropFilter: "blur(10px)",
          zIndex: 9999,
        }}
      >
        {isLoading && <CircularProgress color="primary" />}
      </Box>
    </Backdrop>
  );
};

export default BackgroundBlur;
