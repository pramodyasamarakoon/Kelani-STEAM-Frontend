import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { recent_albums } from "../const";
import Loader from "../Loader";
import axios from "axios";
import { Link } from "react-router-dom";

const AlbumContainer = ({ AlbumData }) => {
  useEffect(() => {
    console.log("AlbumData in AlbumContainer:", AlbumData);
  }, [AlbumData]); // Run this effect whenever AlbumData changes

  // console.log(AlbumData, "AlbumData Loaded");
  const [albumIndex, setAlbumIndex] = useState(0);

  const handleAlbumNameClick = (index) => {
    setAlbumIndex(index);
    console.log(`Grid at index ${index} clicked.`);
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
          {AlbumData &&
            AlbumData.map((album, index) => (
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
                <p className="font-OpenSans-Regular text-[14px]">
                  {album.AlbumName}
                </p>
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
          {AlbumData &&
            AlbumData.map((album, index) => (
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
                <p className="font-OpenSans-Regular text-[14px]">
                  {album.AlbumName}
                </p>
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
            {AlbumData &&
              AlbumData.length > 0 &&
              AlbumData[albumIndex].PhotographedBy && (
                <div>
                  {AlbumData[albumIndex].PhotographedBy.map(
                    (photographed, index) => (
                      <p
                        key={index}
                        className="font-OpenSans-Regular text-[14px] pl-4"
                      >
                        {photographed}
                      </p>
                    )
                  )}
                </div>
              )}

            <p className="font-OpenSans-SemiBold text-[18px] mt-2 ">
              Edited By
            </p>
            {AlbumData &&
              AlbumData.length > 0 &&
              AlbumData[albumIndex].EditedBy && (
                <div>
                  {AlbumData[albumIndex].EditedBy.map((edited, index) => (
                    <p
                      key={index}
                      className="font-OpenSans-Regular text-[14px] pl-4"
                    >
                      {edited}
                    </p>
                  ))}
                </div>
              )}
          </Grid>
          <Grid
            item
            xs={11}
            sx={{
              textAlign: "right",
            }}
          >
            {AlbumData &&
              AlbumData.length > 0 &&
              AlbumData[albumIndex].AlbumLink && (
                <Link to={AlbumData[albumIndex].AlbumLink} target="_blank">
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      mr: 2,
                    }}
                  >
                    View Album
                  </Button>
                </Link>
              )}
          </Grid>
        </Grid>
      </Grid>
      {/* Album Images PC */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "52%",
          left: "56%",
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
          {AlbumData &&
            AlbumData.length > 0 &&
            AlbumData[albumIndex].ImageUrls &&
            AlbumData[albumIndex].ImageUrls.map((imgLinks, index) => (
              <Grid
                key={index}
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
      {/* Album Images Mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          zIndex: 100,
          color: "white",
          marginY: 5,
        }}
      >
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
          {AlbumData &&
            AlbumData.length > 0 &&
            AlbumData[albumIndex].ImageUrls &&
            AlbumData[albumIndex].ImageUrls.map((imgLinks, index) => (
              <Grid
                key={index}
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
            {AlbumData &&
              AlbumData.length > 0 &&
              AlbumData[albumIndex].PhotographedBy && (
                <div>
                  {AlbumData[albumIndex].PhotographedBy.map(
                    (photographed, index) => (
                      <p
                        key={index}
                        className="font-OpenSans-Regular text-[14px] pl-4"
                      >
                        {photographed}
                      </p>
                    )
                  )}
                </div>
              )}

            <p className="font-OpenSans-SemiBold text-xl mt-2 ">Edited By</p>
            {AlbumData &&
              AlbumData.length > 0 &&
              AlbumData[albumIndex].EditedBy && (
                <div>
                  {AlbumData[albumIndex].EditedBy.map((edited, index) => (
                    <p
                      key={index}
                      className="font-OpenSans-Regular text-[14px] pl-4"
                    >
                      {edited}
                    </p>
                  ))}
                </div>
              )}
          </Grid>
          <Grid
            item
            xs={11}
            sx={{
              textAlign: "right",
            }}
          >
            {AlbumData &&
              AlbumData.length > 0 &&
              AlbumData[albumIndex].AlbumLink && (
                <Link to={AlbumData[albumIndex].AlbumLink} target="_blank">
                  <Button
                    variant="contained"
                    //   onClick={() => setIsFormOpen(true)}
                    // onClick={() => openDialogForm()}
                    size="small"
                    sx={{
                      mt: 2,
                      mr: 2,
                    }}
                  >
                    View Album
                  </Button>
                </Link>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlbumContainer;
