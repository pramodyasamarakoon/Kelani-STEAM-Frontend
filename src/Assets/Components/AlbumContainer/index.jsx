import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { recent_albums } from "../const";
import Loader from "../Loader";

const AlbumContainer = () => {
  const AlbumData = recent_albums.slice(0, 9);
  console.log(AlbumData, "AlbumData");
  const [albumIndex, setAlbumIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAlbumNameClick = (index) => {
    setAlbumIndex(index);
    console.log(`Grid at index ${index} clicked.`);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Grid
      container
      // spacing={2}
      sx={{
        marginX: { xs: 5, md: 14 },
        marginBottom: 8,
        marginTop: { xs: 0, md: 2 },
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      {/* Album Title PC */}
      <Grid
        item
        xs={8.5}
        sx={{
          display: { xs: "none", md: "flex" },
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
            paddingY: "15px",
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
                height: "40px",
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                paddingX: "15px",
                marginBottom: "2px",
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
              <p className="font-OpenSans-Regular text-[14px]">{album.title}</p>
              {/* <p className="font-OpenSans-Regular text-[12px]">
                Updated: {album.updated}
              </p> */}
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* Album Title Mobile */}
      <Grid
        item
        xs={12}
        sx={{
          display: { xs: "flex", md: "none" },
          backgroundColor: "#e0e0e0",
          height: "430px",
          borderRadius: "20px",
          marginTop: 3,
        }}
      >
        <Grid
          container
          sx={{
            paddingLeft: "5px",
            paddingRight: "5px",
            paddingY: "10px",
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
                height: "50px",
                display: "flex",
                alignItems: "center",
                padding: "15px",
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
              <p className="font-OpenSans-Regular text-[14px]">{album.title}</p>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* Text Container PC */}
      <Grid
        item
        xs={3.4}
        sx={{
          display: { xs: "none", md: "flex" },
          borderRadius: "20px",
          borderWidth: "3px",
          borderColor: "#e0e0e0",
          borderStyle: "solid",
          backgroundColor: "transparent",
          height: "430px",
          // display: "flex",
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
          <Grid item xs={3}></Grid>
          <Grid
            item
            xs={9}
            sx={{
              textAlign: "left",
            }}
          >
            <p className="font-OpenSans-SemiBold text-[18px] ">
              Photographed By
            </p>
            {AlbumData[albumIndex].photographed.map((photographed) => (
              <p className="font-OpenSans-Regular text-[14px] pl-4">
                {photographed}
              </p>
            ))}

            <p className="font-OpenSans-SemiBold text-[18px] mt-2 ">
              Edited By
            </p>
            {AlbumData[albumIndex].edited.map((edited) => (
              <p className="font-OpenSans-Regular text-[14px] pl-4">{edited}</p>
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
              size="small"
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
      {/* Album Images PC */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "52%",
          left: "58%",
          zIndex: 100,
          color: "white",
          transform: "translate(-50%, -50%)",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
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
        )}
      </Box>
      {/* Album Images Mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          zIndex: 100,
          color: "white",
          marginY: 5,
        }}
      >
        {loading ? (
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              height: "300px",
              marginLeft: 1,
            }}
          >
            <Loader />
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "300px",
              marginLeft: 1,
            }}
          >
            {AlbumData[albumIndex].imgLinks.map((imgLinks) => (
              <Grid
                item
                xs={5.9}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#616161",
                  height: "150px",
                  marginBottom: 0.5,
                  backgroundImage: `url(${imgLinks})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Grid>
            ))}
          </Grid>
        )}
      </Box>
      {/* Text Container Mobile */}
      <Grid
        item
        xs={12}
        sx={{
          display: { xs: "flex", md: "none" },
          borderRadius: "20px",
          borderWidth: "3px",
          borderColor: "#e0e0e0",
          borderStyle: "solid",
          backgroundColor: "transparent",
          height: "auto",
          paddingY: 3,
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
    </Grid>
  );
};

export default AlbumContainer;
