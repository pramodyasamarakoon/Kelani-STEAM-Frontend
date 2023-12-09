import React from "react";

const ProjectCardMini = ({ coverImage, images, title, description }) => {
  return (
    <div id={title} className="w-[100%] h-screen relative">
      {/* Background Image */}
      <img
        src={coverImage}
        alt="Mehewara"
        className="w-[100%] h-full object-cover"
      />
      {/* Container */}
      <div
        className="absolute inset-0 flex flex-col  justify-center w-[80%] mx-auto text-left"
        style={{ zIndex: 1 }}
      >
        <p className="text-white text-3xl font-Lobster-Regular w-[90%] my-8">
          {title}
        </p>
        <p className="text-white text-[12px] font-OpenSans-Regular ">
          {description}{" "}
        </p>
        {/* Image Boxes */}
        <div className="flex mt-8">
          {/* Boxes */}
          {images.map((image, index) => (
            <div key={index} className="w-[150px] h-[100px] mr-2">
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
  );
};

export default ProjectCardMini;
