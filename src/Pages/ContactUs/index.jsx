import React, { useState } from "react";
import NavBar from "../../Assets/Components/NavBar";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import { Avatar, Box, Button, Grid, Stack } from "@mui/material";
import Footer from "../../Assets/Components/Footer/Footer";
import facebook from "../../Assets/Icons/Images/Facebook.png";
import instagram from "../../Assets/Icons/Images/Instagram.png";

const ContactUs = () => {
  const [selectedIcon, setSelectedIcon] = useState("facebook");

  // default icon styles
  const defaultIconStyles = {
    width: 30,
    height: 30,
    cursor: "pointer",
  };

  // default icon styles
  const selectedIconStyles = {
    width: 44,
    height: 44,
    cursor: "pointer",
    boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.5)",
  };

  const handleContact = (selectedIcon) => {
    setSelectedIcon(selectedIcon);
  };
  return (
    <div className="w-full">
      <NavBar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <Grid
        container
        spacing={2}
        className="h-[480px]"
        sx={{
          marginTop: 15,
          marginBottom: 5,
          width: 1172,
          marginX: "auto",
          display: { xs: "none", md: "flex" },
          borderRadius: "20px",
          backgroundColor: "#e0e0e0",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Icons Grid */}
        <div
          style={{
            width: "5%",
            height: "full",
            position: "absolute",
            left: "3%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#d0d0d0",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            // paddingTop: 4,
          }}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Avatar
              alt="Facebook Icon"
              src="https://cdn-icons-png.flaticon.com/128/145/145802.png"
              sx={
                selectedIcon === "facebook"
                  ? selectedIconStyles
                  : defaultIconStyles
              }
              onClick={() => handleContact("facebook")}
            />
            <Avatar
              alt="Instagram Icon"
              src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
              sx={
                selectedIcon === "instagram"
                  ? selectedIconStyles
                  : defaultIconStyles
              }
              onClick={() => handleContact("instagram")}
            />
            <Avatar
              alt="linkedin Icon"
              src="https://cdn-icons-png.flaticon.com/128/145/145807.png"
              sx={
                selectedIcon === "linkedin"
                  ? selectedIconStyles
                  : defaultIconStyles
              }
              onClick={() => handleContact("linkedin")}
            />
            <Avatar
              alt="G Mail Icon"
              src="https://cdn-icons-png.flaticon.com/128/888/888853.png"
              sx={
                selectedIcon === "gmail"
                  ? selectedIconStyles
                  : defaultIconStyles
              }
              onClick={() => handleContact("gmail")}
            />
            <Avatar
              alt="Whatsapp Icon"
              src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
              sx={
                selectedIcon === "whatsapp"
                  ? selectedIconStyles
                  : defaultIconStyles
              }
              onClick={() => handleContact("whatsapp")}
            />
          </Stack>
        </div>
        {/*  Image Container */}
        <div
          style={{
            width: "66%",
            height: "460px",
            backgroundColor: "#ffffff",
            backgroundImage:
              selectedIcon === "facebook"
                ? `url(${facebook})`
                : selectedIcon === "instagram"
                ? `url(${instagram})`
                : null,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            position: "absolute",
            left: "6%",
          }}
        ></div>
        {/*  text grid */}
        <div
          className="h-[460px]"
          style={{
            width: "26%",
            height: "460px",
            position: "absolute",
            left: "73%",
            padding: 18,
          }}
        >
          <p className="font-Poppins-SemiBold text-3xl mb-6 mt-4">
            {selectedIcon === "facebook"
              ? "Official Facebook Page"
              : selectedIcon === "instagram"
              ? "Official Instagram Page"
              : selectedIcon === "linkedin"
              ? "Official linkedin Account"
              : selectedIcon === "gmail"
              ? "Connect with the E mail"
              : selectedIcon === "whatsapp"
              ? "Send a message from Whatsapp"
              : null}
          </p>
          <p className="font-Poppins-regular text-[16px] mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            modi dolores voluptas sapiente autem quasi quia laudantium quis odio
            harum nostrum quaerat tenetur, voluptates aut quibusdam vero
            exercitationem vitae eaque!
          </p>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <Button
              variant="contained"
              // onClick={handleCloseNavMenu}
              sx={{
                color: "black",
                display: "end",
                justifyContent: "end",
              }}
            >
              Visit
            </Button>
          </Box>
        </div>
      </Grid>
      {/* </Grid> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
