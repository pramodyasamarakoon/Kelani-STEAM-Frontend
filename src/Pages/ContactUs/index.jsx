import React, { useState } from "react";
import NavBar from "../../Assets/Components/NavBar";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import { Avatar, Box, Button, Grid, Stack } from "@mui/material";
import Footer from "../../Assets/Components/Footer/Footer";
import facebook from "../../Assets/Icons/Images/Facebook.png";
// import instagram from "../../Assets/Icons/Images/Instagram.png";

const ContactUs = () => {
  const [selectedIcon, setSelectedIcon] = useState("facebook");

  // default icon styles
  const defaultIconStyles = {
    width: { xs: 20, md: 30 },
    height: { xs: 20, md: 30 },
    cursor: "pointer",
  };

  // default icon styles
  const selectedIconStyles = {
    width: { xs: 34, md: 44 },
    height: { xs: 34, md: 44 },
    cursor: "pointer",
    boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.5)",
  };

  const handleContact = (selectedIcon) => {
    setSelectedIcon(selectedIcon);
  };

  const visitOnclick = () => {
    window.open(
      `https://www.facebook.com/kelanisteam/posts/764020515745112?ref=embed_post`,
      "_blank"
    );
  };

  return (
    <div className="w-full">
      <NavBar />
      <ScrollToTopButton />

      {/* Hero Section PC */}
      <Grid
        container
        spacing={2}
        className="h-[480px]"
        sx={{
          marginTop: 15,
          marginBottom: 5,
          width: "75%",
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
                ? `url(${facebook})`
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
          <p className="font-Poppins-SemiBold text-2xl mb-6 mt-4">
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
          <p className="font-Poppins-regular text-[14px] mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            modi dolores voluptas sapiente autem quasi quia laudantium quis odio
            harum nostrum quaerat tenetur, voluptates aut quibusdam vero
            exercitationem vitae eaque!
          </p>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <Button
              variant="contained"
              onClick={visitOnclick}
              size="small"
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

      {/* Hero Section Mobile */}
      <Grid
        container
        spacing={2}
        className="h-[500px]"
        sx={{
          marginTop: 12,
          marginBottom: 5,
          width: "100%",
          marginX: "auto",
          display: { xs: "flex", md: "none" },
          // borderRadius: "20px",
          backgroundColor: "#e0e0e0",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Icons Grid */}
        <div
          style={{
            width: "10%",
            height: "full",
            position: "absolute",
            left: "10%",
            top: "25%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#d0d0d0",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            zIndex: 99,
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
              size="small"
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
            width: "100%",
            height: "250px",
            backgroundColor: "#ffffff",
            backgroundImage:
              selectedIcon === "facebook"
                ? `url(${facebook})`
                : selectedIcon === "instagram"
                ? `url(${facebook})`
                : null,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // borderRadius: "20px",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        {/*  text grid */}
        <div
          className="h-[250px]"
          style={{
            width: "80%",
            // height: "460px",
            position: "absolute",
            top: "75%",
            left: "50%",
            // padding: 18,
            transform: "translate(-50%, -50%)",
          }}
        >
          <p className="font-Poppins-SemiBold text-2xl mb-2 mt-4">
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
          <p className="font-Poppins-regular text-[14px] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            modi dolores voluptas sapiente autem quasi quia laudantium quis odio
            harum nostrum quaerat tenetur,Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              // onClick={handleCloseNavMenu}
              size="small"
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
      <div>
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fkelanisteam%2Fposts%2Fpfbid027oRXquKtTTPZW7Z2zFPzHEtJ7ucQkmuQUZr6bfHp8jw72j4wgKKPjP2Xm3Mgh1Uzl&show_text=true&width=500"
          width="500"
          height="790"
          // style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7Vwfm38nogs?si=L1p_t8GKowCwaMeM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
