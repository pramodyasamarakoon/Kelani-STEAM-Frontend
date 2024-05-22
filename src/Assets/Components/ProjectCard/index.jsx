import React from "react";
import { Element } from "react-scroll";

const ProjectCard = ({ key, coverImage, images, title, description }) => {
  return (
    <Element name={title} key={key}>
      <div id={title} className="w-full h-screen relative">
        {/* Background Image */}
        <img
          src={coverImage}
          alt="Mehewara"
          className="w-full h-full object-cover"
        />
        {/* Container */}
        <div
          className="absolute inset-0 flex flex-col  justify-center w-[800px] text-left"
          style={{ zIndex: 1, left: "10%" }}
        >
          <p className="text-white text-5xl font-Lobster-Regular my-8">
            {title}
          </p>
          <p className="text-white text-[14px] font-OpenSans-Regular w-[600px]">
            {description}{" "}
          </p>
          {/* Image Boxes */}
          <div className="flex mt-8">
            {/* Boxes */}
            {images.map((image, index) => (
              <div key={index} className="w-[180px] h-[130px] mr-5">
                <img
                  src={image}
                  alt={index}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        ></div>
      </div>
    </Element>
  );
};

export default ProjectCard;
