import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { recent_albums } from "../const";

const AlbumContainer = () => {
  const AlbumData = recent_albums.slice(0, 7);
  console.log(AlbumData, "AlbumData");
  const [albumIndex, setAlbumIndex] = useState(0);

  const handleAlbumNameClick = (index) => {
    setAlbumIndex(index);
    console.log(`Grid at index ${index} clicked.`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginX: 10,
        marginBottom: 8,
        marginTop: 2,
        display: { xs: "none", md: "flex" },
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      {/* Album Title */}
      <Grid
        item
        xs={8}
        sx={{
          backgroundColor: "#e0e0e0",
          height: "430px",
          borderRadius: "20px",
        }}
      >
        <Grid
          container
          sx={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingY: "30px",
          }}
        >
          {AlbumData.map((album, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                textAlign: "left",
                cursor: "pointer",
                height: "46px",
                display: "flex",
                alignItems: "center",
                paddingX: "15px",
                marginBottom: "4px",
                "&:hover": { backgroundColor: "#FF3737", color: "#ffffff" },
                ...(albumIndex === index
                  ? {
                      backgroundColor: "#ED1B1B",
                      color: "#ffffff",
                    }
                  : {}),
              }}
              onClick={() => handleAlbumNameClick(index)}
            >
              <p className="font-OpenSans-Regular text-[16px]">{album.title}</p>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* Text Container */}
      <Grid
        item
        xs={3.9}
        sx={{
          borderRadius: "20px",
          borderWidth: "3px",
          borderColor: "#e0e0e0",
          borderStyle: "solid",
          backgroundColor: "transparent",
          height: "430px",
          display: "flex",
          alignContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignContent: "center",
          }}
        >
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={10}
            sx={{
              textAlign: "left",
            }}
          >
            <p className="font-OpenSans-SemiBold text-xl ">Photographed By</p>
            {AlbumData[albumIndex].photographed.map((photographed) => (
              <p className="font-OpenSans-Regular text-[16px] pl-4">
                {photographed}
              </p>
            ))}

            <p className="font-OpenSans-SemiBold text-xl mt-2 ">Edited By</p>
            {AlbumData[albumIndex].edited.map((edited) => (
              <p className="font-OpenSans-Regular text-[16px] pl-4">{edited}</p>
            ))}
          </Grid>
          <Grid
            item
            xs={11}
            sx={{
              textAlign: "right",
            }}
          >
            <Button
              variant="contained"
              //   onClick={() => setIsFormOpen(true)}
              // onClick={() => openDialogForm()}
              sx={{
                mt: 2,
                mr: 2,
              }}
            >
              View Album
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* Album Images */}
      <Box
        sx={{
          position: "absolute",
          top: "52%",
          left: "55%",
          zIndex: 100,
          color: "white",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "450px",
          }}
        >
          {AlbumData[albumIndex].imgLinks.map((imgLinks) => (
            <Grid
              item
              xs={5.9}
              sx={{
                borderRadius: "20px",
                backgroundColor: "#616161",
                height: "180px",
                marginBottom: 0.5,
                backgroundImage: `url(${imgLinks})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default AlbumContainer;
