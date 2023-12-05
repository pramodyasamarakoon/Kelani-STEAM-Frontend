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
import CountingNumber from "../../Assets/Components/CountingNumber";
import Logo from "../../../src/Assets/LogoWhite.png";
import Team from "../../Assets/Images/BookNowImage/TeamMedium.jpg";

// Recent Album details can change from the Const.js file

function HomePage() {
  const [formData, setFormData] = useState({
    heroContainer: [
      {
        heroTopic: "Official Media Unit",
        heroSubTopic: "Faculty of Science, University of Kelaniya",
        countingNumbers: [
          {
            title: "Years of Excellence",
            number: 6,
            isPlus: true,
          },
          {
            title: "Different Avenues",
            number: 8,
            isPlus: false,
          },
          {
            title: "Undergraduates",
            number: 300,
            isPlus: true,
          },
          {
            title: "Events Covered",
            number: 110,
            isPlus: true,
          },
        ],
        heroCoverImage: Team,
      },
    ],
    aboutUsContainer: [
      {
        aboutUsImage: AboutUsSmall,
        text01: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quaerat eos laborum sit? Repudiandae, dicta, aliquid eligendi
        cum excepturi quod aliquam, alias quidem perspiciatis dolores
        ab quisquam voluptatibus eos nobis impedit!`,
        text02: `Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nam cumque sit eligendi laudantium nesciunt numquam
        odit? Id sunt, blanditiis dolores recusandae laudantium
        maiores ex iste, impedit ducimus provident magnam quidem?`,
      },
    ],
  });

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

  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />
      <ScrollToTopButton />

      {isFormOpen ? <Loader /> : null}

      {/* Hero Section */}
      <Grid container spacing={2}>
        {/* Home Container Grid PC */}
        <Grid
          container
          sx={{
            marginY: 2,
            display: { xs: "none", md: "flex" },
          }}
          className="h-screen"
        >
          {/* Image Container */}
          <Grid
            item
            xs={12}
            className="h-screen flex justify-center items-center "
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
                    height: "100vh",
                    backgroundImage: `url(${formData.heroContainer[0].heroCoverImage})`,
                    // backgroundImage:
                    //   "url(https://sltappbucket.s3.amazonaws.com/testimage.jpg?AWSAccessKeyId=ASIA46B2THDZ6OEGUQD2\u0026Expires=1858492301\u0026x-amz-security-token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIGpau1S4fx1XWAoxnkVUhJOkFCDVIommCzFFEbI5SyTpAiAxjzEkoAHFe3o0IactbY1fVcR%2F3l55xjRQFWVFpwxbEirqAggpEAAaDDg4OTE4MTEyNDg1MSIMkgvWmZjKE%2FnvSdrNKscCBs7ecW1YLeWO4Oyex6PW%2BM35yP3jCdGy9KSTh22voUmXKQ8xADqrktkYonrIs%2BKRvm8NjnUZxzrqtl2%2BGVKDgBFriI1CEqZkclXi0vtn%2FZ%2BILLwrizzPCe7UIqPnHU90CTLAGIK7oX72tZe0e0JYP%2Be%2FxjU%2B%2BqAJ37fTXa2gzPIrBCFNfWthsXw9GI%2BMgFLby8zsGiS7qWCyWXNTDWbxSzP37zlEcGPB1KbMqcON4fDEN44Sahngr8hyEEHRDQMFGap6WawOEiMIdIsBDVIU71Vq3XP%2FMhr%2BmFKp46icX8wxWtJ8slLc7S%2F%2FvNcbD8rUsUeWhFu2Ugcn2cAOksQfjg2NM1LBWwk4L4I4CfL3t5JEKLo5IggjKtMu1rP%2BoaZtPHQ%2FApHgmjR05lDa673G0i4scbZOJCK7JJc8eYhRnls6P%2F6kPBLlMIbm9qoGOp8BxMor0VGvQre7UeAMQ7jESA6RloDOdHawsixDqxjYU%2F8NDRbmPL4GQyyXhKCEzpVvU2JD9EP36yccHGH5oozLypDdB023KwEu6DDsPRqvf%2BQOGkESlI4NK9TICULc8l41m60XHp92FYx9yuvJ9S3LBDC%2FGX4eRguPbpjIzwQvJ%2BVOXIxNXIJZtDarGejUCPq6cwPLaBjIoczC9NLyXO%2Bi\u0026Signature=T3nkhQzwkYfpnJOB3EByPF6XuVM%3D)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {/*  Text */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "30%",
                    zIndex: 100,
                    color: "white",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <p>
                    <img src={Logo} alt="" className="h-[120px] mb-4 mx-auto" />
                  </p>
                  <p className="font-Poppins-SemiBold text-5xl mx-4">
                    {formData.heroContainer[0].heroTopic}
                  </p>
                  <p className="font-Poppins-Light text-2xl">
                    {formData.heroContainer[0].heroSubTopic}
                  </p>
                </Box>

                {/* Counting Numbers */}
                <Grid
                  container
                  sx={{
                    marginTop: 14,
                    marginBottom: 8,
                    position: "absolute",
                    top: "55%",
                    left: "35%",
                    zIndex: 100,
                    color: "white",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Counting Container */}
                  <Grid
                    item
                    xs={12}
                    className="h-auto flex justify-center items-center "
                  >
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[0].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[0].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[0].isPlus
                      }
                    />
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[1].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[1].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[1].isPlus
                      }
                    />
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[2].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[2].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[2].isPlus
                      }
                    />
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[3].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[3].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[3].isPlus
                      }
                    />
                  </Grid>
                </Grid>

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

        {/* Home Container Grid Mobile */}
        <Grid
          container
          id="ourJourney"
          sx={{
            marginTop: 11,
            marginBottom: 5,
            display: { xs: "flex", md: "none" },
          }}
        >
          {/* Image Container */}
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
                    backgroundImage: `url(${formData.heroContainer[0].heroCoverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {/*  Text */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    zIndex: 100,
                    color: "white",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <p>
                    <img src={Logo} alt="" className="h-[60px] mb-4 mx-auto" />
                  </p>
                  <p className="font-Poppins-SemiBold text-3xl">
                    {formData.heroContainer[0].heroTopic}
                  </p>
                  <p className="font-Poppins-Light text-[16px">
                    {formData.heroContainer[0].heroSubTopic}
                  </p>
                </Box>

                {/* Counting Numbers */}
                <Grid
                  container
                  sx={{
                    marginTop: 14,
                    marginBottom: 8,
                    position: "absolute",
                    top: "55%",
                    left: "50%",
                    zIndex: 100,
                    color: "white",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Counting Container */}
                  <Grid
                    item
                    xs={12}
                    className="h-auto flex justify-center items-center "
                  >
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[0].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[0].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[0].isPlus
                      }
                    />
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[1].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[1].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[1].isPlus
                      }
                    />
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[2].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[2].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[2].isPlus
                      }
                    />
                    <CountingNumber
                      label={formData.heroContainer[0].countingNumbers[3].title}
                      initialValue={0}
                      finalValue={
                        formData.heroContainer[0].countingNumbers[3].number
                      }
                      isPlus={
                        formData.heroContainer[0].countingNumbers[3].isPlus
                      }
                    />
                  </Grid>
                </Grid>

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

        {/* About US Grid PC */}
        <Grid
          container
          // spacing={2}
          className="h-auto flex justify-center items-center "
          id="about-us-section"
          sx={{
            marginX: 16,
            marginTop: 7,
            marginBottom: 5,
            display: { xs: "none", md: "flex" },
          }}
        >
          {/*About US Topic */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
            {/* <Collapse in={showAboutUs} timeout={1000}> */}
            <p className="font-Poppins-SemiBold text-5xl pt-4">About Us</p>
            {/* </Collapse> */}
          </Grid>
          {/*About US Group Photo */}
          <Grid
            item
            xs={6}
            className="h-auto flex justify-center items-center "
            sx={{ padding: 6 }}
          >
            {/* <Collapse in={showAboutUs} timeout={1000}> */}{" "}
            <img
              className="m-10"
              src={formData.aboutUsContainer[0].aboutUsImage}
              alt="Team Photo"
            />
            {/* </Collapse> */}
          </Grid>
          {/*About US Content */}
          <Grid
            item
            xs={6}
            className="h-auto flex justify-center items-center "
            // sx={{ padding: 6 }}
          >
            {/* <Collapse in={showAboutUs} timeout={2000}> */}{" "}
            <Grid container>
              <Grid
                item
                xs={12}
                className="h-auto flex justify-start items-center"
                // sx={{ padding: 6 }}
              >
                <p className=" font-Poppins-Regular text-[14px]">
                  {formData.aboutUsContainer[0].text01} <br />
                  <br /> {formData.aboutUsContainer[0].text02}
                </p>
              </Grid>
              <Grid item xs={12} className="h-auto" sx={{ paddingY: 2 }}>
                <Link to="/AboutUs">
                  <Button
                    variant="contained"
                    // onClick={handleCloseNavMenu}
                    size="small"
                    sx={{
                      mx: 4,
                      // color: "black",
                    }}
                  >
                    Read More...
                  </Button>
                </Link>
              </Grid>
            </Grid>
            {/* </Collapse> */}
          </Grid>
        </Grid>

        {/* About US Grid Mobile */}
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: -3,
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
            <img
              className="mr-4"
              src={formData.aboutUsContainer[0].aboutUsImage}
              alt="Team Photo"
            />
          </Grid>
          {/*About US Content */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
            sx={{ marginLeft: 7, marginRight: 7 }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                className="h-auto flex justify-start items-center"
                // sx={{ padding: 6 }}
              >
                <p className=" font-Poppins-Regular text-[14px]">
                  {formData.aboutUsContainer[0].text01} <br />
                  <br /> {formData.aboutUsContainer[0].text02}
                </p>
              </Grid>
              <Grid item xs={12} className="h-auto" sx={{ paddingY: 2 }}>
                <Link to="/AboutUs">
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
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* T Shirt Grid PC */}
        <Grid
          container
          spacing={2}
          id="grid-below-section"
          sx={{
            marginX: 16,
            marginBottom: 10,
            display: { xs: "none", md: "flex" },
          }}
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

          <Grid container spacing={2} sx={{ marginX: 36 }}>
            {/*T Shirt Button */}
            <Grid
              item
              xs={4}
              className="h-auto flex justify-center items-center "
              // sx={{ padding: 6 }}
            >
              {" "}
              {/* <Collapse in={showGridBelow} timeout={2000}> */}
              <Link to="/OrderTShirtFormPage">
                <Button
                  variant="contained"
                  // onClick={handleCloseNavMenu}
                  size="small"
                  sx={{
                    mx: 4,
                    // color: "black",
                  }}
                >
                  Order Now
                </Button>
              </Link>
              {/* </Collapse> */}
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
          sx={{
            marginTop: 1,
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
            <p className="font-Poppins-SemiBoldItalic text-2xl p-4">
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
                my: 2,
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
          sx={{
            marginX: { md: 14 },
            marginTop: { xs: 1, md: 2 },
          }}
        >
          <Grid item xs={12} sx={{ textAlign: { xs: "center", md: "left" } }}>
            <p className="font-OpenSans-SemiBold text-2xl md:text-4xl">
              Recent Albums
            </p>
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
            marginY: -1,
            marginBottom: 2,
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
                    onClick={() => setIsFormOpen(true)}
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
