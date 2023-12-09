import NavBar from "../../Assets/Components/NavBar";
import Footer from "../../Assets/Components/Footer/Footer";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import ProjectCard from "../../Assets/Components/ProjectCard";
import img01 from "../../Assets/Images/ProjectImages/Mehewara/01.jpg";
import { Project_Data } from "../../Assets/Components/const";
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
      .get("http://localhost:8080/projects/getAll")
      .then((response) => {
        // response.data is an array of albums
        const projects = response.data;

        const projectData = projects.map((project) => ({
          id: project.id,
          projectName: project.projectName,
          projectDescription: project.projectDescription,
          coverImageUrl: project.coverImageUrl,
          previewImageUrls: project.previewImageUrls,
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
                key={data.id}
                coverImage={data.coverImageUrl}
                images={data.previewImageUrls}
                title={data.projectName}
                description={data.projectDescription}
              />
            ))}
          </div>

          {/* Project Card Mobile  */}
          <div className="block md:hidden">
            {formData.projects.map((data) => (
              <ProjectCardMini
                key={data.id}
                coverImage={data.coverImageUrl}
                images={data.previewImageUrls}
                title={data.projectName}
                description={data.projectDescription}
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
