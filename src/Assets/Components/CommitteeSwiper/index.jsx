import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules"; // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Team from "../../Images/BookNowImage/TeamMedium.jpg";
import { Box } from "@mui/material";
import HoverCard from "../PresidentHoverCard";
import PresidentHoverCard from "../PresidentHoverCard";
import DirectorHoverCard from "../DirectorHoverCard";
import { presidents, videCommittee, steamCommittee } from "../const";
import CommitteeHoverCard from "../CommitteeCard";
import CommitteeCard from "../CommitteeCard";
import committee01 from "../../Images/Committee/Committee01.png";

const CommitteeSwiper = ({
  bgImg,
  presidentPosition,
  presidentName,
  presidentImg,
  isPresident,
}) => {
  // Select the appropriate committee based on isPresident value
  const committee = isPresident ? videCommittee : steamCommittee;
  console.log("Committee", committee);
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
          "background-image": `url(${bgImg})`,
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
          <p className="font-Poppins-SemiBold text-5xl mb-2">
            {presidentPosition}
          </p>
          <p className="font-Poppins-Regular text-[25px]">{presidentName}</p>
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
        >
          {isPresident ? <PresidentHoverCard /> : <DirectorHoverCard />}
        </div>
        {/* <div
          style={{
            width: "491px",
            height: "201px",
            position: "relative",
            zIndex: 103,
            left: "50%", // Align to the left
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            // justifyContent: "center",
            marginRight: "20px", // Add right margin
            // background: "linear-gradient(to right, #ED1B1B, #1A1515)", // Gradient from #ED1B1B to #1A1515
            background: "#e0e0e0",
            borderRadius: "30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 103,
              left: "35%", // Align to the left
              top: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "left",
              color: "black",
            }}
          >
            <p className="font-Poppins-SemiBold text-[32px]">
              {presidentPosition}
            </p>
            <p className="font-Poppins-Regular text-[16px]">{presidentName}</p>
            <p className="font-Poppins-Regular text-[12px]">Level 04</p>
            <p className="font-Poppins-Regular text-[12px]">
              Department of Industrial Management
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: 103,
              left: "80%", // Align to the left
              top: "40%",
              transform: "translate(-50%, -50%)",
              "background-image": `url(${committee01})`,
              width: "50%",
              height: "120%",
              WebkitBackgroundSize: "cover",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div> */}
      </SwiperSlide>

      {/* 2nd Slide */}
      <SwiperSlide>
        {committee.slice(0, 6).map((committeeMember, index) => (
          <div key={committeeMember.id}>
            {/* Text */}
            <div
              style={{
                position: "absolute",
                zIndex: 103,
                left: committeeMember.left,
                top: committeeMember.top,
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginRight: "20px",
              }}
            >
              <p className="font-Poppins-SemiBold text-2xl flex-wrap">
                {committeeMember.position}
              </p>
              <p className="font-Poppins-SemiBold text-[16px] flex-wrap">
                {committeeMember.subPosition}
              </p>
              <p className="font-Poppins-Regular text-[15px]">
                {committeeMember.name}
              </p>
            </div>
            {/* Image Card */}
            <div
              style={{
                position: "absolute",
                zIndex: 103,
                left: committeeMember.imgLeft,
                top: committeeMember.top,
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                marginRight: "20px", //
              }}
            >
              <CommitteeCard img={committeeMember.img} />
            </div>
          </div>
        ))}
      </SwiperSlide>

      {/* 3rd Slide */}
      {committee.slice(6, 12).length > 0 ? (
        <SwiperSlide>
          {committee.slice(6, 12).map((committeeMember, index) => (
            <div key={committeeMember.id}>
              {/* Text */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 103,
                  left: committeeMember.left,
                  top: committeeMember.top,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: "20px",
                }}
              >
                <p className="font-Poppins-SemiBold text-2xl flex-wrap">
                  {committeeMember.position}
                </p>
                <p className="font-Poppins-SemiBold text-[16px] flex-wrap">
                  {committeeMember.subPosition}
                </p>
                <p className="font-Poppins-Regular text-[15px]">
                  {committeeMember.name}
                </p>
              </div>
              {/* Image Card */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 103,
                  left: committeeMember.imgLeft,
                  top: committeeMember.top,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "20px", //
                }}
              >
                <CommitteeCard img={committeeMember.img} />
              </div>
            </div>
          ))}
        </SwiperSlide>
      ) : null}

      {/* 4th Slide */}
      {committee.slice(12, 18).length > 0 ? (
        <SwiperSlide>
          {committee.slice(12, 18).map((committeeMember, index) => (
            <div key={committeeMember.id}>
              {/* Text */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 103,
                  left: committeeMember.left,
                  top: committeeMember.top,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: "20px",
                }}
              >
                <p className="font-Poppins-SemiBold text-2xl flex-wrap">
                  {committeeMember.position}
                </p>
                <p className="font-Poppins-SemiBold text-[16px] flex-wrap">
                  {committeeMember.subPosition}
                </p>
                <p className="font-Poppins-Regular text-[15px]">
                  {committeeMember.name}
                </p>
              </div>
              {/* Image Card */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 103,
                  left: committeeMember.imgLeft,
                  top: committeeMember.top,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "20px", //
                }}
              >
                <CommitteeCard img={committeeMember.img} />
              </div>
            </div>
          ))}
        </SwiperSlide>
      ) : null}

      {/* 5th Slide */}
      {committee.slice(18, 24).length > 0 ? (
        <SwiperSlide>
          {committee.slice(18, 24).map((committeeMember, index) => (
            <div key={committeeMember.id}>
              {/* Text */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 103,
                  left: committeeMember.left,
                  top: committeeMember.top,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: "20px",
                }}
              >
                <p className="font-Poppins-SemiBold text-2xl flex-wrap">
                  {committeeMember.position}
                </p>
                <p className="font-Poppins-SemiBold text-[16px] flex-wrap">
                  {committeeMember.subPosition}
                </p>
                <p className="font-Poppins-Regular text-[15px]">
                  {committeeMember.name}
                </p>
              </div>
              {/* Image Card */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 103,
                  left: committeeMember.imgLeft,
                  top: committeeMember.top,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "20px", //
                }}
              >
                <CommitteeCard img={committeeMember.img} />
              </div>
            </div>
          ))}
        </SwiperSlide>
      ) : null}
    </Swiper>
  );
};

export default CommitteeSwiper;
