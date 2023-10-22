import { Box, Button, Grid } from "@mui/material";
import NavBar from "../../Assets/Components/NavBar";
import Team from "../../Assets/Images/BookNowImage/Team.jpg";

function AboutUs() {
  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />

      {/* Book Now Grid PC */}
      <Grid
        container
        sx={{
          marginY: 11,
          display: { xs: "none", md: "flex" },
        }}
      >
        {/* Book Now Images */}
        <Grid item xs={12} className="h-auto flex justify-center items-center ">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  backgroundImage: `url(${Team})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Booking Text */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="font-Lobster-Regular text-6xl">
                  Do You Want Us to Cover Your Event?
                </p>
                <Button
                  variant="contained"
                  // onClick={handleCloseNavMenu}
                  sx={{
                    my: 4,
                    // color: "black",
                  }}
                >
                  Order Now
                </Button>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 99,
                  backgroundImage:
                    "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 10%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.6) 90%, rgba(0, 0, 0, 0.4) 100%)", // Gradient from left black to right transparent
                  //   opacity: 0.7,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutUs;
