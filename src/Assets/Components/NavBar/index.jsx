import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../../Assets/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import back20 from "../../Images/Back30Small.jpg";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const pages = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Our Projects",
    link: "/OurProjects",
  },
  {
    label: "About Us",
    link: "/AboutUs",
  },
  {
    label: "Contact Us",
    link: "/ContactUs",
  },
];

const adminPages = [
  {
    label: "Albums",
    link: "/AdminAlbums",
  },
  {
    label: "Bookings",
    link: "/AdminBookings",
  },
  {
    label: "Projects",
    link: "/AdminProjects",
  },
  {
    label: "Committee",
    link: "/AdminCommittee",
  },
  {
    label: "T Shirt Orders",
    link: "/AdminTShirtOrders",
  },
];

const superAdminPages = [
  {
    label: "Albums",
    link: "/AdminAlbums",
  },
  {
    label: "Bookings",
    link: "/AdminBookings",
  },
  {
    label: "Projects",
    link: "/AdminProjects",
  },
  {
    label: "Committee",
    link: "/AdminCommittee",
  },
  {
    label: "T Shirt Orders",
    link: "/AdminTShirtOrders",
  },
  {
    label: "Users",
    link: "/AdminUsers",
  },
];

const NavBar = ({ visibilityOfOrderButton = true, isAdmin = false }) => {
  // console.log("NavBar visibilityOfOrderButton:", visibilityOfOrderButton);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isAccountOpen, setAccountOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  useEffect(() => {
    // Check for the AuthToken in local storage
    const userName = localStorage.getItem("User Name");
    if (userName) {
      setUserName(userName);
    }
  }, []);

  const handleAccountButton = () => {
    if (isAccountOpen) {
      setAccountOpen(false);
    } else {
      setAccountOpen(true);
      const UserName = localStorage.getItem("User Name");
      setUserName(UserName);
    }
  };

  const onSignOut = () => {
    setUserName("");
    localStorage.removeItem("User Name");
    localStorage.removeItem("AuthToken");
    // Redirect to the home page
    window.location.href = "/";
  };

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
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        margin: { xs: 1, md: 1 },
        width: "99%",
        background: `url(${back20})`, // Replace 'path/to/your/image.jpg' with the actual path to your background image
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
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
            <LazyLoadImage src={Logo} alt="Logo" className="h-[35px]" />
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
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link to={page.link}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
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
            {!isAdmin &&
              pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  href={page.link}
                  size="small"
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                    marginX: "1rem",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            {isAdmin &&
              userName !== "Admin Account" &&
              adminPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  href={page.link}
                  size="small"
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                    marginX: "1rem",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            {isAdmin &&
              userName === "Admin Account" &&
              superAdminPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  href={page.link}
                  size="small"
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    backgroundColor: "transparent",
                    borderRadius: "1rem",
                    marginX: "1rem",
                  }}
                >
                  {page.label}
                </Button>
              ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {visibilityOfOrderButton !== undefined &&
            visibilityOfOrderButton ? (
              <Link to="/OrderTShirtFormPage">
                <Button
                  variant="contained"
                  onClick={handleCloseNavMenu}
                  size="small"
                  sx={{
                    mx: 4,
                    color: "black",
                    display: "end",
                    justifyContent: "end",
                  }}
                >
                  Order the T-Shirt
                </Button>
              </Link>
            ) : null}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAdmin ? (
              <IconButton
                onClick={handleAccountButton}
                size="medium"
                sx={{
                  mx: 4,
                  color: "black",
                }}
              >
                <PersonIcon />
              </IconButton>
            ) : null}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {visibilityOfOrderButton ? (
              <Link to="/OrderTShirtFormPage">
                <Tooltip title="Order the T-Shirt">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    // onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <StoreIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : null}
          </Box>
        </Toolbar>
      </Container>

      {isAccountOpen ? (
        <Box
          sx={{
            position: "fixed",
            top: "80px",
            right: "80px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "16px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
          }}
        >
          <p className="font-Poppins-Regular mt-2 mb-3"> {userName} </p>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            onClick={onSignOut}
            sx={{ alignSelf: "flex-end" }}
          >
            Log Out
          </Button>
        </Box>
      ) : null}
    </AppBar>
  );
};

export default NavBar;
