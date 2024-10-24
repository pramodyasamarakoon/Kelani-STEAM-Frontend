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
  // console.log("Committee", committee);
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
        <div
          style={{
            position: "absolute",
            zIndex: 103,
            width: "90%", // Full width of the SwiperSlide
            height: "80%", // Full height of the SwiperSlide
            display: "flex",
            justifyContent: "center", // Center items horizontally
            alignItems: "center", // Center items vertically
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row", // Align items in a row
              alignItems: "center", // Center items vertically within this div
              gap: "40px", // Space between text and image
            }}
          >
            {/* Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Align items in a column
                alignItems: "flex-end", // Right-align content
              }}
            >
              <p className="font-Poppins-SemiBold text-3xl mb-2">
                {presidentPosition}
              </p>
              <p className="font-Poppins-Regular text-[16px]">
                {presidentName}
              </p>
            </div>
            {/* President Card */}
            <div>
              {isPresident ? <PresidentHoverCard /> : <DirectorHoverCard />}
            </div>
          </div>
        </div>
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
              <p className="font-Poppins-SemiBold text-xl flex-wrap">
                {committeeMember.position}
              </p>
              <p className="font-Poppins-SemiBold text-[14px] flex-wrap">
                {committeeMember.subPosition}
              </p>
              <p className="font-Poppins-Regular text-[12px]">
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
                // marginRight: "20px", //
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
                <p className="font-Poppins-SemiBold text-xl flex-wrap">
                  {committeeMember.position}
                </p>
                <p className="font-Poppins-SemiBold text-[14px] flex-wrap">
                  {committeeMember.subPosition}
                </p>
                <p className="font-Poppins-Regular text-[12px]">
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
                <p className="font-Poppins-SemiBold text-xl flex-wrap">
                  {committeeMember.position}
                </p>
                <p className="font-Poppins-SemiBold text-[14px] flex-wrap">
                  {committeeMember.subPosition}
                </p>
                <p className="font-Poppins-Regular text-[12px]">
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
                <p className="font-Poppins-SemiBold text-xl flex-wrap">
                  {committeeMember.position}
                </p>
                <p className="font-Poppins-SemiBold text-[14px] flex-wrap">
                  {committeeMember.subPosition}
                </p>
                <p className="font-Poppins-Regular text-[12px]">
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
