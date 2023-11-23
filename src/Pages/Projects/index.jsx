import NavBar from "../../Assets/Components/NavBar";
import Footer from "../../Assets/Components/Footer/Footer";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import ProjectCard from "../../Assets/Components/ProjectCard";
import img01 from "../../Assets/Images/ProjectImages/Mehewara/01.jpg";
import { Project_Data } from "../../Assets/Components/const";
import ProjectSideBar from "../../Assets/Components/ProjectSideBar";
import ProjectCardMini from "../../Assets/Components/ProjectCardMini";

function Projects() {
  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />
      <ScrollToTopButton />
      <ProjectSideBar />

      {/* Project Card PC  */}
      <div className="hidden md:block">
        {Project_Data.map((data) => (
          <ProjectCard
            key={data.title}
            coverImage={data.coverImage}
            images={[data.img02, data.img03, data.img04]}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>

      {/* Project Card Mobile  */}
      <div className="block md:hidden">
        {Project_Data.map((data) => (
          <ProjectCardMini
            key={data.title}
            coverImage={data.coverImage}
            images={[data.img02, data.img03, data.img04]}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
}

export default Projects;
