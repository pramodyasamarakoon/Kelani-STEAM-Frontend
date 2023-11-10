import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules"; // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box } from "@mui/material";

const ContactUsSwiper = ({}) => {
  // Select the appropriate committee based on isPresident value
  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
        // margin: 20,
        height: "450px",
        position: "relative",
      }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation]}
      className="mySwiper"
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
    >
      {/* Background Image */}
      <div
        style={{
          // "background-image": `url(${Team})`,
          "background-image": `url('https://plus.unsplash.com/premium_photo-1673407522879-943c75392371?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D)`,
          position: "absolute",
          left: 0,
          top: 0,
          width: "130%",
          height: "100%",
          WebkitBackgroundSize: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-swiper-parallax="-10%"
      ></div>
      {/* Gradient */}
      <Box
        sx={{
          width: "100%",
          height: "150vh",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          //   zIndex: 99,
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.4) 100%)", // Gradient from left black to right transparent
          //   opacity: 0.7,
        }}
      />
      {/* President Slide */}
      <SwiperSlide>
        {/* Text */}
        <div
          style={{
            position: "absolute",
            zIndex: 103,
            left: "40%", // Align to the left
            top: "50%",
            // bottom: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column", // Align items in a column
            alignItems: "flex-end", // Right-align content
            marginRight: "20px", // Add right margin
          }}
        >
          <p className="font-Poppins-SemiBold text-5xl mb-2">Hello</p>
          <p className="font-Poppins-Regular text-[25px]">Pramod</p>
        </div>
        {/* President Card */}
        <div
          style={{
            position: "absolute",
            zIndex: 103,
            right: "10%", // Align to the left
            top: "50%",
            // bottom: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center", // Center content horizontally
            marginRight: "20px", // Add right margin
          }}
        ></div>
      </SwiperSlide>

      {/* 2nd Slide */}
      <SwiperSlide></SwiperSlide>
    </Swiper>
  );
};

export default ContactUsSwiper;
