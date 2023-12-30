import {
  Box,
  Button,
  Fab,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import NavBar from "../../Assets/Components/NavBar";
import Team from "../../Assets/Images/BookNowImage/TeamMedium.jpg";
import PresidentImage from "../../Assets/Images/Committee/ViDe/President.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../../../src/Assets/LogoWhite.png";
import Footer from "../../Assets/Components/Footer/Footer";
import { useEffect, useState } from "react";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollToTopButton from "../../Assets/Components/ScrollToTopButton";
import CommitteeSwiper from "../../Assets/Components/CommitteeSwiper";
import HoverCard from "../../Assets/Components/PresidentHoverCard";
import {
  STEAM_bg_img,
  vide_bg_img,
  presidents,
  steamCommittee,
  videCommittee,
} from "../../Assets/Components/const";
import CountingNumber from "../../Assets/Components/CountingNumber";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { aboutUsImageList } from "../../Assets/Components/const";
import CommitteeSwiperMini from "../../Assets/Components/CommitteeSwiperMini";
import axios from "axios";

const limitedItemData = aboutUsImageList.slice(0, 12);

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function AboutUs() {
  const [formData, setFormData] = useState({
    heroContainer: [
      {
        heroTopic: "Official Media Unit",
        heroSubTopic: "Faculty of Science, University of Kelaniya",
      },
    ],
    SteamCommitteeData: [],
    VideCommitteeData: [],
  });
  const [readM, setReadM] = useState(false);
  const [committeeDataLoader, setCommitteeDataLoader] = useState(false);

  // useEffect for readM state
  useEffect(() => {
    console.log(readM, "Updated!");
    loadCommitteeData();
  }, [readM]);

  const readMore = () => {
    setReadM(!readM);
  };

  // Scroll Buttons
  const handleScrollToGrid = (id) => {
    const gridElement = document.getElementById(id);
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trackingInExpandStyles = {
    animation:
      "tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1.000) both",
    // Add other styles or Tailwind classes as needed
  };

  // loading the committee data from the database
  const loadCommitteeData = async () => {
    setCommitteeDataLoader(true);

    try {
      const [steamResponse, videResponse] = await Promise.all([
        axios.get("http://localhost:8080/committee/getByPartialId", {
          params: {
            partialId: "steam",
          },
        }),
        axios.get("http://localhost:8080/committee/getByPartialId", {
          params: {
            partialId: "vide",
          },
        }),
      ]);

      setFormData((prevFormData) => ({
        ...prevFormData,
        SteamCommitteeData: steamResponse.data,
        VideCommitteeData: videResponse.data,
      }));

      console.log("Steam Committee Data loaded", steamResponse.data);
      console.log("Vide Committee Data loaded", videResponse.data);
    } catch (error) {
      console.error("Error loading committee data:", error);
    } finally {
      setCommitteeDataLoader(false);
    }
  };

  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />

      <ScrollToTopButton />

      {/* Hero Section PC */}
      <Grid container>
        {/* Hero Text Grid PC */}
        <Grid
          container
          md={4}
          className="h-screen flex justify-center "
          sx={{ display: { xs: "none", md: "flex" }, padding: 7 }}
        >
          <Grid item xs={12} sx={{ marginTop: 20 }}>
            <Box sx={{}}>
              {/* <p className="font-Poppins-Regular text-4xl">Welcome to</p>
              <p className="font-Poppins-Regular text-4xl">the</p> */}
              <div style={trackingInExpandStyles}>
                <p className="font-Poppins-SemiBold text-4xl pt-4">
                  {formData.heroContainer[0].heroTopic}
                </p>
              </div>
              <p className="font-Poppins-Regular text-[18px] py-2">
                {formData.heroContainer[0].heroSubTopic}
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {/* Buttons */}
            <Box
              sx={{
                color: "white",
                textAlign: "center",
              }}
            >
              <a href="#ourJourney">
                <Button
                  variant="contained"
                  onClick={() => handleScrollToGrid("OurJourney")}
                  endIcon={<ArrowDownwardIcon />}
                  size="small"
                  sx={{
                    my: 1,
                    width: "220px",
                  }}
                >
                  Our Journey
                </Button>
              </a>
            </Box>
            <Box
              sx={{
                color: "white",
                textAlign: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => handleScrollToGrid("Committee")}
                size="small"
                endIcon={<ArrowDownwardIcon />}
                sx={{
                  // my: 1,
                  width: "220px",
                }}
              >
                Executive Committee
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Hero Image Grid PC */}
        <Grid
          item
          xs={12}
          md={8}
          className="h-screen flex justify-center items-center "
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <ImageList
              // sx={{ height: 450 }}
              variant="quilted"
              cols={4}
              rowHeight={90}
              style={{
                transform: "rotate(-25deg)",
                opacity: 0.8,
              }}
            >
              {aboutUsImageList.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>
      </Grid>

      {/* Hero Section Mobile */}
      <Grid container>
        <Grid
          item
          xs={12}
          className="h-screen relative"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {/* Image List */}
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <ImageList
              // sx={{ height: 450 }}
              variant="quilted"
              cols={4}
              rowHeight={80}
              style={{
                // transform: "rotate(-8deg)",
                opacity: 0.4,
              }}
            >
              {aboutUsImageList.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>

          {/* Hero Text Grid Mobile */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "black",
            }}
          >
            <Grid item xs={12}>
              <Box sx={{}}>
                <div style={trackingInExpandStyles}>
                  <p className="font-Poppins-SemiBold text-4xl pt-2">
                    {formData.heroContainer[0].heroTopic}
                  </p>
                </div>
                <p className="font-Poppins-SemiBold text-[16px]">
                  {formData.heroContainer[0].heroSubTopic}
                </p>
              </Box>
            </Grid>

            {/* Buttons */}
            <Box sx={{ mt: 1 }}>
              <a href="#ourJourney">
                <Button
                  variant="contained"
                  onClick={() => handleScrollToGrid("OurJourney")}
                  endIcon={<ArrowDownwardIcon />}
                  size="small"
                  sx={{
                    width: "200px",
                    // my: 1,
                  }}
                >
                  Our Journey
                </Button>
              </a>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Button
                variant="contained"
                onClick={() => handleScrollToGrid("Committee")}
                endIcon={<ArrowDownwardIcon />}
                size="small"
                sx={{
                  width: "200px",
                  // my: 1,
                }}
              >
                Executive Committee
              </Button>
            </Box>
          </div>
        </Grid>
      </Grid>

      {/* About Us Text Grid PC */}
      <Grid
        container
        id="OurJourney"
        sx={{
          marginY: 8,
          paddingX: 30,
          display: { xs: "none", md: "flex" },
        }}
      >
        {/* Text Container PC */}
        <Grid item xs={12} className="h-auto justify-center items-center ">
          <p className="font-Lobster-Regular text-5xl">Our Journey</p>
          <p className="font-Poppins-Regular text-[14px] text-left py-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, id
            nesciunt! Fuga dicta tempore consequuntur odio ut suscipit
            laudantium dolor, doloribus deleniti aperiam placeat, repellat
            repudiandae, accusantium aliquam. Quas cum, saepe possimus tempore
            labore, odio reiciendis culpa doloribus asperiores consequuntur
            eaque praesentium necessitatibus commodi temporibus suscipit, quidem
            nobis? Laudantium fuga tempore itaque amet, consequuntur laborum
            ipsa nisi, reprehenderit tempora iure nulla alias praesentium
            repellat autem doloribus quasi. Numquam deserunt nostrum ipsam
            sapiente explicabo ex labore, ab magnam, molestiae sequi modi animi
            consequuntur a aut tempore eaque laudantium iusto unde quas. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Ab porro dicta
            dolorem, inventore tempore nisi labore reiciendis perspiciatis{" "}
            <br />
            <br />
            tempora consequatur aliquid quis asperiores suscipit veritatis odio
            voluptates incidunt sequi provident ipsa. Iste ab nisi suscipit
            delectus impedit inventore soluta blanditiis. Laboriosam aperiam et
            ratione harum dignissimos similique, hic excepturi nulla doloremque
            quam, quisquam sequi quaerat facilis enim obcaecati placeat quae,
            deserunt laudantium ut eligendi dolor sed praesentium consectetur
            amet? Repellat a fuga officia nisi beatae voluptatibus explicabo
            obcaecati? Excepturi eum nemo facere, veniam repellat sed dolores
            aliquam blanditiis, at recusandae molestiae, soluta iure explicabo
            iusto ipsam porro necessitatibus. Et maxime animi voluptates laborum
            ducimus. At odio quibusdam aliquam nemo voluptatum architecto
            provident distinctio. Ex nemo eaque pariatur? Doloremque labore a
            explicabo soluta pariatur dignissimos cupiditate qui nesciunt ipsum
            consectetur? Aperiam, fugiat quisquam voluptates ullam atque hic,
            suscipit quos numquam rem tempore recusandae cupiditate optio <br />
            <br />
            blanditiis aliquid architecto rerum ea vero. Esse nostrum voluptas
            officia cumque temporibus. Itaque nam explicabo atque culpa, iusto,
            maiores, corrupti sit voluptate alias quas aperiam aliquam similique
            minus est quis hic. Ab id quae vitae ex repellendus at ipsa suscipit
            optio iusto! Accusantium voluptatum fugiat sint rem, voluptates,
            quisquam enim animi laudantium deleniti distinctio nam excepturi ea
            exercitationem numquam commodi iste ut sed quo tempora unde tempore,
            quidem facilis magni non. Hic dignissimos nemo expedita consectetur?
            Iusto alias quasi, officia quisquam obcaecati, enim cum, commodi
            dignissimos fugiat laudantium ea. Sunt numquam explicabo iure
            aspernatur sapiente,
            <br />
            <br /> consequuntur cum non aut! Modi vel deleniti accusamus
            asperiores officia beatae veniam quia exercitationem numquam sunt?
            Reiciendis, praesentium. Quia cum totam velit, ducimus tempore aut
            impedit nesciunt? Corrupti rerum odio, ut dicta animi fugiat
            delectus blanditiis? Hic aspernatur, a incidunt omnis maxime eveniet
            labore illum voluptatem neque, ducimus laudantium optio dignissimos
            quia fugiat repellendus repellat cumque debitis recusandae. Ducimus
            reiciendis, ut debitis blanditiis at eligendi enim tempora, dolorem
            exercitationem est sequi aperiam dolores odit provident inventore
            repellendus, distinctio dolor commodi ratione unde ab aliquid quae
            quas ullam.
          </p>
        </Grid>
      </Grid>

      {/* About Us Text Grid Mobile */}
      <Grid
        container
        id="OurJourney"
        sx={{
          marginY: 5,
          paddingX: 5,
          display: { xs: "flex", md: "none" },
        }}
      >
        {/* Text Container */}
        {!readM ? (
          <Grid item xs={12} className="h-auto justify-center items-center ">
            <p className="font-Lobster-Regular text-4xl">Our Journey</p>
            <p className="font-Poppins-Regular text-[12px] text-left pt-6 pb-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, id
              nesciunt! Fuga dicta tempore consequuntur odio ut suscipit
              laudantium dolor, doloribus deleniti aperiam placeat, repellat
              repudiandae, accusantium aliquam. Quas cum, saepe possimus tempore
              labore, odio reiciendis culpa doloribus asperiores consequuntur
              eaque praesentium necessitatibus commodi temporibus suscipit,
              quidem nobis? Laudantium fuga tempore itaque amet, consequuntur
              laborum ipsa nisi, reprehenderit tempora iure nulla alias
              praesentium repellat autem doloribus quasi. Numquam deserunt
              nostrum ipsam sapiente explicabo ex labore, ab magnam, molestiae
              sequi modi animi consequuntur a aut tempore eaque laudantium iusto
              unde quas. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Ab porro dicta dolorem, inventore tempore nisi labore
              reiciendis perspiciatis
            </p>
            <Button
              variant="plain"
              onClick={readMore}
              size="sm"
              sx={{
                fontSize: 12,
                color: "blue",
              }}
            >
              Read More
            </Button>
          </Grid>
        ) : (
          <Grid item xs={12} className="h-auto justify-center items-center ">
            <p className="font-Lobster-Regular text-4xl">Our Journey</p>
            <p className="font-Poppins-Regular text-[12px] text-left pt-6 pb-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, id
              nesciunt! Fuga dicta tempore consequuntur odio ut suscipit
              laudantium dolor, doloribus deleniti aperiam placeat, repellat
              repudiandae, accusantium aliquam. Quas cum, saepe possimus tempore
              labore, odio reiciendis culpa doloribus asperiores consequuntur
              eaque praesentium necessitatibus commodi temporibus suscipit,
              quidem nobis? Laudantium fuga tempore itaque amet, consequuntur
              laborum ipsa nisi, reprehenderit tempora iure nulla alias
              praesentium repellat autem doloribus quasi. Numquam deserunt
              nostrum ipsam sapiente explicabo ex labore, ab magnam, molestiae
              sequi modi animi consequuntur a aut tempore eaque laudantium iusto
              unde quas. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Ab porro dicta dolorem, inventore tempore nisi labore
              reiciendis perspiciatis <br />
              <br />
              tempora consequatur aliquid quis asperiores suscipit veritatis
              odio voluptates incidunt sequi provident ipsa. Iste ab nisi
              suscipit delectus impedit inventore soluta blanditiis. Laboriosam
              aperiam et ratione harum dignissimos similique, hic excepturi
              nulla doloremque quam, quisquam sequi quaerat facilis enim
              obcaecati placeat quae, deserunt laudantium ut eligendi dolor sed
              praesentium consectetur amet? Repellat a fuga officia nisi beatae
              voluptatibus explicabo obcaecati? Excepturi eum nemo facere,
              veniam repellat sed dolores aliquam blanditiis, at recusandae
              molestiae, soluta iure explicabo iusto ipsam porro necessitatibus.
              Et maxime animi voluptates laborum ducimus. At odio quibusdam
              aliquam nemo voluptatum architecto provident distinctio. Ex nemo
              eaque pariatur? Doloremque labore a explicabo soluta pariatur
              dignissimos cupiditate qui nesciunt ipsum consectetur? Aperiam,
              fugiat quisquam voluptates ullam atque hic, suscipit quos numquam
              rem tempore recusandae cupiditate optio <br />
              <br />
              blanditiis aliquid architecto rerum ea vero. Esse nostrum voluptas
              officia cumque temporibus. Itaque nam explicabo atque culpa,
              iusto, maiores, corrupti sit voluptate alias quas aperiam aliquam
              similique minus est quis hic. Ab id quae vitae ex repellendus at
              ipsa suscipit optio iusto! Accusantium voluptatum fugiat sint rem,
              voluptates, quisquam enim animi laudantium deleniti distinctio nam
              excepturi ea exercitationem numquam commodi iste ut sed quo
              tempora unde tempore, quidem facilis magni non. Hic dignissimos
              nemo expedita consectetur? Iusto alias quasi, officia quisquam
              obcaecati, enim cum, commodi dignissimos fugiat laudantium ea.
              Sunt numquam explicabo iure aspernatur sapiente,
              <br />
              <br /> consequuntur cum non aut! Modi vel deleniti accusamus
              asperiores officia beatae veniam quia exercitationem numquam sunt?
              Reiciendis, praesentium. Quia cum totam velit, ducimus tempore aut
              impedit nesciunt? Corrupti rerum odio, ut dicta animi fugiat
              delectus blanditiis? Hic aspernatur, a incidunt omnis maxime
              eveniet labore illum voluptatem neque, ducimus laudantium optio
              dignissimos quia fugiat repellendus repellat cumque debitis
              recusandae. Ducimus reiciendis, ut debitis blanditiis at eligendi
              enim tempora, dolorem exercitationem est sequi aperiam dolores
              odit provident inventore repellendus, distinctio dolor commodi
              ratione unde ab aliquid quae quas ullam.
            </p>
            <Button
              variant="plain"
              onClick={readMore}
              size="sm"
              sx={{
                fontSize: 12,
                color: "blue",
              }}
            >
              Show Less
            </Button>
          </Grid>
        )}
      </Grid>

      {/* viDe Committee Grid PC */}
      <Grid
        container
        id="Committee"
        sx={{
          marginY: 8,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Grid
          item
          xs={12}
          className="h-auto flex justify-center items-center pb-8 "
        >
          <p className="font-Poppins-SemiBold text-4xl">
            ViDe Executive Committee 22/23
          </p>
        </Grid>
        {/* Committee Container */}
        <Grid item xs={12} className="h-auto flex justify-center items-center ">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <CommitteeSwiper
                bgImg={vide_bg_img.url}
                presidentPosition={presidents[0].position}
                presidentName={presidents[0].name}
                presidentImg={presidents[0].img}
                isPresident={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* viDe Committee Grid Mobile */}
      <Grid
        container
        id="Committee"
        sx={{
          marginY: 5,
          display: { xs: "flex", md: "none" },
        }}
      >
        <Grid
          item
          xs={12}
          className="h-auto flex justify-center items-center pb-4 "
        >
          <p className="font-Poppins-SemiBold text-2xl px-4">
            ViDe Executive Committee 22/23
          </p>
        </Grid>

        {/* Committee Container Mobile*/}
        <Grid
          item
          xs={12}
          className="h-auto md:hidden flex justify-center items-center "
        >
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <CommitteeSwiperMini
                bgImg={vide_bg_img.url}
                presidentPosition={presidents[0].position}
                presidentName={presidents[0].name}
                presidentImg={presidents[0].img}
                isPresident={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* STEAM Committee Grid PC */}
      <Grid
        container
        id="Committee"
        sx={{
          marginY: 8,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Grid
          item
          xs={12}
          className="h-auto flex justify-center items-center pb-8 "
        >
          <p className="font-Poppins-SemiBold text-4xl">
            STEAM Executive Committee 22/23
          </p>
        </Grid>
        {/* Committee Container */}
        <Grid item xs={12} className="h-auto flex justify-center items-center ">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <CommitteeSwiper
                bgImg={STEAM_bg_img.url}
                presidentPosition={presidents[1].position}
                presidentName={presidents[1].name}
                presidentImg={presidents[1].img}
                isPresident={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* STEAM Committee Grid Mobile */}
      <Grid
        container
        id="Committee"
        sx={{
          marginY: 8,
          display: { xs: "flex", md: "none" },
        }}
      >
        <Grid
          item
          xs={12}
          className="h-auto flex justify-center items-center pb-4 "
        >
          <p className="font-Poppins-SemiBold text-2xl px-4">
            STEAM Executive Committee 22/23
          </p>
        </Grid>
        {/* Committee Container */}
        <Grid item xs={12} className="h-auto flex justify-center items-center ">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <CommitteeSwiperMini
                bgImg={STEAM_bg_img.url}
                presidentPosition={presidents[1].position}
                presidentName={presidents[1].name}
                presidentImg={presidents[1].img}
                isPresident={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutUs;
