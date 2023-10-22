import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../Assets/Logo.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Grid, ImageList, ImageListItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Cover01 from "../../Assets/Cover01.jpg";
// import require from "require";
import img01 from "../../Assets/Images/HeroImages/01.jpg";
import img02 from "../../Assets/Images/HeroImages/02.jpg";
import img03 from "../../Assets/Images/HeroImages/03.jpg";
import img04 from "../../Assets/Images/HeroImages/04.jpg";
import img05 from "../../Assets/Images/HeroImages/05.jpg";
import img06 from "../../Assets/Images/HeroImages/06.jpg";
import img07 from "../../Assets/Images/HeroImages/07.jpg";
import img08 from "../../Assets/Images/HeroImages/08.jpg";
import img09 from "../../Assets/Images/HeroImages/09.jpg";
import img10 from "../../Assets/Images/HeroImages/10.jpg";
import AboutUsSmall from "../../Assets/Images/AboutUsImage/AboutUsSmall.jpg";
import TShirtSmall from "../../Assets/Images/TShirtImage/TShirtSmall.jpg";
import BookImage from "../../Assets/Images/BookNowImage/BookNowSmall.jpg";
import OpenInNew from "@mui/icons-material/OpenInNew";
import NavBar from "../../Assets/Components/NavBar";
import Footer from "../../Assets/Components/Footer/Footer";

const heroImages = [
  {
    img: img01,
    title: "Image 01",
    rows: 2,
    cols: 1,
  },
  {
    img: img02,
    title: "Image 02",
    rows: 2,
    cols: 1,
  },
  {
    img: img03,
    title: "Image 03",
    rows: 2,
    cols: 1,
  },
  {
    img: img04,
    title: "Image 04",
    rows: 2,
    cols: 1,
  },
  {
    img: img05,
    title: "Image 05",
    rows: 2,
    cols: 1,
  },
  {
    img: img06,
    title: "Image 06",
    rows: 2,
    cols: 1,
  },
];

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

const pages = ["Home", "Our Projects", "About Us", "Contact Us"];

function HomePage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const colors = {
    black: "#212121",
  };

  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />
      {/* <AppBar
        position="fixed"
        color="transparent"
        sx={{ margin: 1, width: "99%" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 6,
                ml: 4,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={Logo} alt="" className="h-[40px]" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={Logo} alt="" className="h-[40px]" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                    marginX: "1rem",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="contained"
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 4,
                  color: "black",
                  display: "end",
                  justifyContent: "end",
                }}
              >
                Order the T-Shirt
              </Button>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Tooltip title="Order the T-Shirt">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  // onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar> */}

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
          sx={{
            marginX: 16,
            marginTop: 10,
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
            <p className="font-Poppins-SemiBold text-5xl pt-4">About Us</p>
          </Grid>
          {/*About US Group Photo */}
          <Grid
            item
            xs={6}
            className="h-auto flex justify-center items-center "
            sx={{ padding: 6 }}
          >
            <img className="m-10" src={AboutUsSmall} alt="Team Photo" />
          </Grid>
          {/*About US Content */}
          <Grid
            item
            xs={6}
            className="h-auto flex justify-center items-center "
            // sx={{ padding: 6 }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                className="h-auto flex justify-start items-center"
                // sx={{ padding: 6 }}
              >
                <p className=" font-Poppins-Regular text-[16px]">
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
          sx={{ marginX: 16, display: { xs: "none", md: "flex" } }}
        >
          {/*T Shirt Topic */}
          <Grid
            item
            xs={12}
            className="h-auto flex justify-center items-center "
          >
            <p className="font-Poppins-SemiBoldItalic text-5xl pt-4">
              Member T Shirts Are Available Now
            </p>
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
            {/*T Shirt Photo */}
            <Grid
              item
              xs={8}
              className="h-auto flex justify-center items-center "
              // sx={{ marginX: 36 }}
            >
              <img className="m-10" src={TShirtSmall} alt="T Shirt Flyer" />
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

        {/* Book Now Grid PC */}
        <Grid
          container
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
