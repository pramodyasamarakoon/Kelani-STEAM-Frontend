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
import React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../../Assets/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
    link: "/",
  },
];

function NavBar() {
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
    <AppBar
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
            <LazyLoadImage src={Logo} alt="Logo" className="h-[40px]" />
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
                  <Typography textAlign="center" href={page.link}>
                    {page.label}
                  </Typography>
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
                key={page.label}
                onClick={handleCloseNavMenu}
                href={page.link}
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
    </AppBar>
  );
}

export default NavBar;
