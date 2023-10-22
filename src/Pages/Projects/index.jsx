import { Grid } from "@mui/material";
import NavBar from "../../Assets/Components/NavBar";
import MehewaraImage from "../../Assets/Images/ProjectImages/Mehewara.jpg";
import Footer from "../../Assets/Components/Footer/Footer";

function HomePage() {
  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />
      {/* Project Card PC */}
      <Grid
        container
        spacing={2}
        sx={{
          marginY: 15,
          width: "95%",
          marginX: "auto",
          height: "500px",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Grid item xs={4} className="flex justify-center items-center " sx={{}}>
          {/* Text Grid */}
          <Grid
            container
            spacing={2}
            // sx={{ marginY: 15, width: "95%", marginX: "auto" }}
          >
            <Grid item xs={12} className="flex justify-center items-center ">
              <p className="font-Lobster-Regular text-5xl">Project Mehewara</p>
            </Grid>
            <Grid item xs={12} className="flex justify-center items-center ">
              <p className="font-Poppins-Regular text-[18px]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Asperiores eaque tenetur qui suscipit mollitia amet, pariatur
                molestias rem fugit veniam accusantium consequatur velit
                quisquam sapiente, reiciendis repudiandae beatae, esse omnis?
              </p>
            </Grid>
          </Grid>
        </Grid>
        {/* Image Grid */}
        <Grid
          item
          xs={8}
          className="flex justify-center items-center "
          sx={{
            width: "95%",
            height: "500px",
            marginX: "auto",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-[500px] overflow-hidden object-cover">
            <img className="" src={MehewaraImage} alt="Mehewara Image" />
          </div>
        </Grid>
      </Grid>
      {/* Project Card Mobile */}
      <Grid
        container
        // spacing={2}
        sx={{
          marginY: 10,
          width: "95%",
          marginX: "auto",
          //   height: "500px",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Grid
          item
          xs={12}
          className="flex justify-center items-center "
          sx={{}}
        >
          {/* Text Grid */}
          <Grid container spacing={2}>
            <Grid item xs={12} className="flex justify-center items-center ">
              <p className="font-Lobster-Regular text-3xl">Project Mehewara</p>
            </Grid>
            <Grid item xs={12} className="flex justify-center items-center">
              <p className="font-Poppins-Regular text-[12px] p-4 pt-0">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Asperiores eaque tenetur qui suscipit mollitia amet, pariatur
                molestias rem fugit veniam accusantium consequatur velit
                quisquam sapiente, reiciendis repudiandae beatae, esse omnis?
              </p>
            </Grid>
          </Grid>
        </Grid>
        {/* Image Grid */}
        <Grid
          item
          xs={12}
          className="flex justify-center items-center "
          sx={{
            width: "95%",
            height: "500px",
            marginX: "auto",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-[500px] overflow-hidden object-cover">
            <img className="" src={MehewaraImage} alt="Mehewara Image" />
          </div>
        </Grid>
      </Grid>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
