import NavBar from "../../Assets/Components/NavBar";
import Footer from "../../Assets/Components/Footer/Footer";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import ProjectCard from "../../Assets/Components/ProjectCard";
import img01 from "../../Assets/Images/ProjectImages/Mehewara/01.jpg";
import { Project_Data, mainEndpoint } from "../../Assets/Components/const";
import ProjectSideBar from "../../Assets/Components/ProjectSideBar";
import ProjectCardMini from "../../Assets/Components/ProjectCardMini";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Assets/Components/Loader";

function Projects() {
  // State to hold form data
  const [formData, setFormData] = useState({
    projects: [],
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // Load album data when the component mounts
    loadProjectData();
  }, []);

  // Load Project Data for the Table
  const loadProjectData = () => {
    setLoader(true);
    axios
      .get(`${mainEndpoint}project/getAll`)
      .then((response) => {
        // response.data is an array of albums
        const projects = response.data;

        const projectData = projects.map((project) => ({
          id: project.Id,
          ProjectName: project.ProjectName,
          ProjectDescription: project.ProjectDescription,
          CoverImageUrl: project.CoverImageUrl,
          PreviewImageUrls: project.PreviewImageUrls,
        }));

        setFormData({
          ...formData,
          projects: projectData,
        });

        console.log("Projects data loaded:", projectData);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />
      <ScrollToTopButton />

      {!loader ? (
        <>
          <ProjectSideBar data={formData.projects} />

          {/* Project Card PC  */}
          <div className="hidden md:block">
            {formData.projects.map((data) => (
              <ProjectCard
                key={data.Id}
                coverImage={data.CoverImageUrl}
                images={data.PreviewImageUrls}
                title={data.ProjectName}
                description={data.ProjectDescription}
              />
            ))}
          </div>

          {/* Project Card Mobile  */}
          <div className="block md:hidden">
            {formData.projects.map((data) => (
              <ProjectCardMini
                key={data.id}
                coverImage={data.CoverImageUrl}
                images={data.PreviewImageUrls}
                title={data.ProjectName}
                description={data.ProjectDescription}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}

      {/* Footer */}
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
}

export default Projects;
