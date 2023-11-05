import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Grid,
  ImageList,
  ImageListItem,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AboutUsSmall from "../../Assets/Images/AboutUsImage/AboutUsSmall.jpg";
import TShirtSmall from "../../Assets/Images/TShirtImage/TShirtSmall.jpg";
import BookImage from "../../Assets/Images/BookNowImage/BookNowSmall.jpg";
import OpenInNew from "@mui/icons-material/OpenInNew";
import NavBar from "../../Assets/Components/NavBar";
import Footer from "../../Assets/Components/Footer/Footer";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import { Link } from "react-router-dom";
import BookingForm from "../BookingForm";
import BackgroundBlur from "../../Assets/Components/BlurBackground";
import back20 from "../../Assets/Images/Back20Small.jpg";
import Loader from "../../Assets/Components/Loader";
import AlbumContainer from "../../Assets/Components/AlbumContainer";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1683009686716-ac2096a5a73b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1683009427470-a36fee396389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1697370149703-82d435c83226?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1682687219612-b12805df750d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1696635102429-189a58beb4e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1697081543985-af767ab666aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1696958363946-b58f40cda426?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1696835938882-e9b41b3c5690?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1682686580849-3e7f67df4015?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1683009686716-ac2096a5a73b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1683009427470-a36fee396389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1697370149703-82d435c83226?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    title: "Breakfast",
    rows: 2,
    cols: 1,
  },
];
const limitedItemData = itemData.slice(0, 12);

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function HomePage() {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showGridBelow, setShowGridBelow] = useState(false);
  const [showEventContainer, setShowEventContainer] = useState(false);

  useEffect(() => {
    const aboutUsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowAboutUs(true);
          } else {
            setShowAboutUs(false);
          }
        });
      },
      { threshold: 0.3 } // Trigger callback when 30% of the target is visible
    );

    const gridBelowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowGridBelow(true);
          } else {
            setShowGridBelow(false);
          }
        });
      },
      { threshold: 0.2 } // Trigger callback when 30% of the target is visible
    );

    const eventContainerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowEventContainer(true);
          } else {
            setShowEventContainer(false);
          }
        });
      },
      { threshold: 0.2 } // Trigger callback when 30% of the target is visible
    );

    const aboutUsSection = document.getElementById("about-us-section");
    const gridBelowSection = document.getElementById("grid-below-section");
    const eventContainerSection = document.getElementById(
      "event-container-section"
    );

    if (aboutUsSection) {
      aboutUsObserver.observe(aboutUsSection);
    }

    if (gridBelowSection) {
      gridBelowObserver.observe(gridBelowSection);
    }

    if (eventContainerSection) {
      eventContainerObserver.observe(eventContainerSection);
    }

    // Cleanup the observers on component unmount
    return () => {
      aboutUsObserver.disconnect();
      gridBelowObserver.disconnect();
      eventContainerObserver.disconnect();
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  // Submit Form Handling
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (formData) => {
    // Handle form submission logic here
    setIsLoading(true);

    // Simulate an API call or any asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form Data Submitted:", formData);
    }, 2000);
  };

  // const openDialogForm = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setIsFormOpen(true);
  //   }, 2000);
  // };

  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />
      <ScrollToTopButton />

      {isFormOpen ? <Loader /> : null}

      {/* Hero Section */}
      <Grid container spacing={2} sx={{ paddingLeft: 5 }}>
        {/* Hero Text Grid PC */}
        <Grid
          item
          xs={12}
          md={4}
          className="h-[500px] flex justify-center items-center "
          sx={{ marginTop: 15, display: { xs: "none", md: "flex" } }}
        >
          <div>
            <Box sx={{}}>
              <p className="font-Poppins-Regular text-4xl">Welcome to</p>
              <p className="font-Poppins-Regular text-4xl">the</p>
              <p className="font-Poppins-SemiBold text-5xl pt-4">
                Official Media Unit
              </p>
              <p className="font-Poppins-Regular text-xl py-2">
                Faculty of Science, University of Kelaniya
              </p>
            </Box>
          </div>
        </Grid>

        {/* Hero Text Grid Mobile */}
        <Grid
          item
          xs={12}
          className="h-[180px] flex justify-center items-center "
          sx={{
            marginTop: 15,
            display: { xs: "flex", md: "none" },
            paddingRight: 5,
          }}
        >
          <div>
            <Box sx={{}}>
              <p className="font-Poppins-Regular text-2xl">Welcome to the</p>
              <p className="font-Poppins-SemiBold text-4xl pt-2">
                Official Media Unit
              </p>
              <p className="font-Poppins-Regular text-xl ">
                Faculty of Science, University of Kelaniya
              </p>
            </Box>
          </div>
        </Grid>

        {/* Hero Image Grid PC */}
        <Grid
          item
          xs={12}
          md={8}
          className="h-[700px] flex justify-center items-center "
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <ImageList
              // sx={{ height: 450 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
              style={{
                transform: "rotate(-25deg)",
                opacity: 0.8,
              }}
            >
              {itemData.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        {/* Hero Image Grid Mobile */}
        <Grid
          item
          xs={12}
          md={8}
          className="h-auto flex justify-center items-center "
          sx={{ display: { xs: "flex", md: "none" }, paddingRight: 5 }}
        >
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <ImageList
              // sx={{ height: 450 }}
              variant="quilted"
              cols={4}
              rowHeight={40}
              style={{
                // transform: "rotate(-25deg)",
                opacity: 0.8,
              }}
            >
              {limitedItemData.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        {/* About US Grid PC */}
        <Grid
          container
          spacing={2}
          className="h-[500px] flex justify-center items-center "
          id="about-us-section"
          sx={{
            marginX: 16,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          {/*About US Topic */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
            <Collapse in={showAboutUs} timeout={1000}>
              <p className="font-Poppins-SemiBold text-5xl pt-4">About Us</p>
            </Collapse>
          </Grid>
          {/*About US Group Photo */}
          <Grid
            item
            xs={6}
            className="h-auto flex justify-center items-center "
            sx={{ padding: 6 }}
          >
            <Collapse in={showAboutUs} timeout={1000}>
              {" "}
              <img className="m-10" src={AboutUsSmall} alt="Team Photo" />
            </Collapse>
          </Grid>
          {/*About US Content */}
          <Grid
            item
            xs={6}
            className="h-auto flex justify-center items-center "
            // sx={{ padding: 6 }}
          >
            <Collapse in={showAboutUs} timeout={2000}>
              {" "}
              <Grid container>
                <Grid
                  item
                  xs={12}
                  className="h-auto flex justify-start items-center"
                  // sx={{ padding: 6 }}
                >
                  <p className=" font-Poppins-Regular text-[16px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat eos laborum sit? Repudiandae, dicta, aliquid
                    eligendi cum excepturi quod aliquam, alias quidem
                    perspiciatis dolores ab quisquam voluptatibus eos nobis
                    impedit! <br />
                    <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Nam cumque sit eligendi laudantium nesciunt numquam
                    odit? Id sunt, blanditiis dolores recusandae laudantium
                    maiores ex iste, impedit ducimus provident magnam quidem?
                  </p>
                </Grid>
                <Grid item xs={12} className="h-auto" sx={{ paddingY: 2 }}>
                  <Button
                    variant="contained"
                    // onClick={handleCloseNavMenu}
                    sx={{
                      mx: 4,
                      // color: "black",
                    }}
                  >
                    Read More...
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>

        {/* About US Grid Mobile */}
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 3,
            marginRight: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          {/*About US Topic */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
            <p className="font-Poppins-SemiBold text-4xl pt-4">About Us</p>
          </Grid>
          {/*About US Group Photo */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
            // sx={{ padding: 6 }}
          >
            <img className="mr-4" src={AboutUsSmall} alt="Team Photo" />
          </Grid>
          {/*About US Content */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
            sx={{ paddingRight: 1 }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                className="h-auto flex justify-start items-center"
                // sx={{ padding: 6 }}
              >
                <p className=" font-Poppins-Regular text-[14px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat eos laborum sit? Repudiandae, dicta, aliquid eligendi
                  cum excepturi quod aliquam, alias quidem perspiciatis dolores
                  ab quisquam voluptatibus eos nobis impedit! <br />
                  <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Nam cumque sit eligendi laudantium nesciunt numquam
                  odit? Id sunt, blanditiis dolores recusandae laudantium
                  maiores ex iste, impedit ducimus provident magnam quidem?
                </p>
              </Grid>
              <Grid item xs={12} className="h-auto" sx={{ paddingY: 2 }}>
                <Button
                  variant="contained"
                  // onClick={handleCloseNavMenu}
                  sx={{
                    mx: 4,
                    // color: "black",
                  }}
                >
                  Read More...
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* T Shirt Grid PC */}
        <Grid
          container
          spacing={2}
          id="grid-below-section"
          sx={{ marginX: 16, display: { xs: "none", md: "flex" } }}
        >
          {/*T Shirt Topic */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
            {/* <Collapse in={showGridBelow} timeout={1000}> */}
            <p className="font-Poppins-SemiBoldItalic text-5xl pt-4">
              Member T Shirts Are Available Now
            </p>
            {/* </Collapse> */}
          </Grid>
          {/*T Shirt Content */}

          <Grid container spacing={2} sx={{ marginTop: 2, marginX: 36 }}>
            {/*T Shirt Button */}
            <Grid
              item
              xs={4}
              className="h-auto flex justify-center items-center "
              // sx={{ padding: 6 }}
            >
              {" "}
              <Collapse in={showGridBelow} timeout={2000}>
                <Button
                  variant="contained"
                  // onClick={handleCloseNavMenu}
                  sx={{
                    mx: 4,
                    // color: "black",
                  }}
                >
                  Order Now
                </Button>
              </Collapse>
            </Grid>
            {/*T Shirt Photo */}
            <Grid
              item
              xs={8}
              className="h-auto flex justify-center items-center "
              // sx={{ marginX: 36 }}
            >
              {" "}
              {/* <Collapse in={showGridBelow} timeout={1000}> */}
              <img className="m-10" src={TShirtSmall} alt="T Shirt Flyer" />
              {/* </Collapse> */}
            </Grid>
          </Grid>
        </Grid>

        {/* T Shirt Grid Mobile */}
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 3,
            marginRight: 1,
            marginBottom: 6,
            display: { xs: "flex", md: "none" },
          }}
        >
          {/*T Shirt Topic */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
            <p className="font-Poppins-SemiBoldItalic text-3xl pt-4 mr-4">
              Member T Shirts Are Available Now
            </p>
          </Grid>
          {/*T Shirt Photo */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center"
            sx={{ marginRight: 12, marginLeft: 11 }}
          >
            <img className="" src={TShirtSmall} alt="T Shirt Flyer" />
          </Grid>
          {/*T Shirt Button */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
            // sx={{ padding: 6 }}
          >
            <Button
              variant="contained"
              // onClick={handleCloseNavMenu}
              sx={{
                mx: 4,
                // color: "black",
              }}
            >
              Order Now
            </Button>
          </Grid>
        </Grid>

        {/* Albums Grid PC */}
        <Grid
          container
          spacing={2}
          sx={{
            marginX: 10,
            marginTop: 8,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <p className="font-OpenSans-SemiBold text-4xl">Recent Albums</p>
          </Grid>
        </Grid>
        <AlbumContainer />

        {/* Book Now Grid PC */}
        <Grid
          container
          id="event-container-section"
          sx={{
            marginY: 5,
            marginLeft: -1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {/* Book Now Images */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
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
                    backgroundImage: `url(${BookImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* <img
                    src={BookImage}
                    alt="BookImage"
                    className="object-cover"
                  /> */}
                </div>

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
                  {/* <Collapse in={showEventContainer} timeout={3000}> */}
                  <p className="font-Lobster-Regular text-6xl">
                    Do You Want Us to Cover Your Event?
                  </p>
                  {/* </Collapse> */}
                  {/* <Collapse in={showEventContainer} timeout={3000}> */}
                  {/* <Link to="/BookingForm"> */}
                  <Button
                    variant="contained"
                    onClick={() => setIsFormOpen(true)}
                    // onClick={() => openDialogForm()}
                    sx={{
                      my: 4,
                      // color: "black",
                    }}
                  >
                    Book Now
                  </Button>
                  {/* </Link> */}
                  {/* </Collapse> */}
                </Box>

                <Box
                  sx={{
                    backgroundColor: "black",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    opacity: "70%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 99,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Booking Form Dialog */}
        <Dialog
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          PaperProps={{
            style: {
              // backgroundColor: "rgba(0, 0, 0)",
              background: `url(${back20})`, // Replace 'path/to/your/image.jpg' with the actual path to your background image
              backgroundSize: "cover", // Adjust the background size as needed
              // opacity: 0.8, // Set the opacity of the background image
            },
          }}
        >
          <DialogTitle style={{ textAlign: "center", paddingTop: 15 }}>
            Booking Form
          </DialogTitle>
          <DialogContent>
            <BookingForm
              onSubmit={handleFormSubmit}
              onClose={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Background Blur */}
        {isFormOpen && <BackgroundBlur isLoading={isLoading} />}

        {/* Book Now Grid Mobile */}
        <Grid
          container
          className="flex justify-center items-center "
          sx={{
            marginY: 4,
            marginX: 4,
            marginRight: 7,
            display: { xs: "flex", md: "none" },
          }}
        >
          {/* Book Now Images */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
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
                    height: "50vh",
                    backgroundImage: `url(${BookImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* <img
                    src={BookImage}
                    alt="BookImage"
                    className="object-cover"
                  /> */}
                </div>

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
                  <p className="font-Lobster-Regular text-4xl">
                    Do You Want Us to Cover Your Event?
                  </p>
                  <Button
                    startDecorator={<OpenInNew />}
                    variant="contained"
                    // onClick={handleCloseNavMenu}
                    sx={{
                      my: 4,
                      // color: "black",
                    }}
                  >
                    Book Now
                  </Button>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "black",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    opacity: "70%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 99,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
