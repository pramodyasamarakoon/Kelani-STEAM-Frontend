import { Box, Button, Fab, Grid, Typography } from "@mui/material";
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

function AboutUs() {
  const [readM, setReadM] = useState(false);

  // useEffect for readM state
  useEffect(() => {
    console.log(readM, "Updated!");
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

  return (
    <div className="w-full">
      {/* Nav Bar */}
      <NavBar />

      <ScrollToTopButton />

      {/* About Us Container Grid PC */}
      <Grid
        container
        sx={{
          marginY: 11,
          display: { xs: "none", md: "flex" },
        }}
      >
        {/* Image Container */}
        <Grid item xs={12} className="h-auto flex justify-center items-center ">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  backgroundImage: `url(${Team})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Booking Text */}
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "30%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <p>
                  <img src={Logo} alt="" className="h-[100px] mb-4 mx-auto" />
                </p>
                <p className="font-Poppins-SemiBold text-6xl">
                  Official Media Unit
                </p>
                <p className="font-Poppins-Light text-2xl">
                  Faculty of Science, University of Kelaniya
                </p>
              </Box>

              {/* Counting Numbers */}
              <Grid
                container
                sx={{
                  marginTop: 14,
                  marginBottom: 8,
                  position: "absolute",
                  top: "55%",
                  left: "30%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Image Container */}
                <Grid
                  item
                  xs={12}
                  className="h-auto flex justify-center items-center "
                >
                  <CountingNumber
                    label="Years of Excellence"
                    initialValue={0}
                    finalValue={5}
                  />
                  <CountingNumber
                    label="Different Avenues"
                    initialValue={10}
                    finalValue={6}
                    isPlus={false}
                  />
                  <CountingNumber
                    label="Undergraduates"
                    initialValue={5}
                    finalValue={300}
                  />
                  <CountingNumber
                    label="Events Covered"
                    initialValue={100}
                    finalValue={110}
                  />
                </Grid>
              </Grid>

              {/* Buttons */}
              <Box
                sx={{
                  position: "absolute",
                  top: "90%",
                  left: "73%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <a href="#ourJourney">
                  <Button
                    variant="contained"
                    onClick={() => handleScrollToGrid("OurJourney")}
                    sx={{
                      my: 4,
                      // color: "black",
                    }}
                  >
                    Our Journey
                  </Button>
                </a>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "90%",
                  left: "85%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleScrollToGrid("Committee")}
                  sx={{
                    my: 4,
                    // color: "black",
                  }}
                >
                  Executive Committee
                </Button>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 99,
                  backgroundImage:
                    "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 10%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.6) 90%, rgba(0, 0, 0, 0.4) 100%)", // Gradient from left black to right transparent
                  //   opacity: 0.7,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* About Us Container Grid Mobile */}
      <Grid
        container
        id="ourJourney"
        sx={{
          marginTop: 11,
          marginBottom: 5,
          display: { xs: "flex", md: "none" },
        }}
      >
        {/* Image Container */}
        <Grid item xs={12} className="h-auto flex justify-center items-center ">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "60vh",
                  backgroundImage: `url(${Team})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Booking Text */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <p>
                  <img src={Logo} alt="" className="h-[60px] mb-4 mx-auto" />
                </p>
                <p className="font-Poppins-SemiBold text-3xl">
                  Official Media Unit
                </p>
                <p className="font-Poppins-Light text-[16px">
                  Faculty of Science, University of Kelaniya
                </p>
              </Box>

              {/* Buttons */}
              <Box
                sx={{
                  position: "absolute",
                  top: "90%",
                  left: "23%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <a href="#ourJourney">
                  <Button
                    variant="contained"
                    // onClick={handleCloseNavMenu}
                    sx={{
                      my: 4,
                      fontSize: 12,
                    }}
                  >
                    Our Journey
                  </Button>
                </a>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "90%",
                  left: "77%",
                  zIndex: 100,
                  color: "white",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  // onClick={handleCloseNavMenu}
                  sx={{
                    my: 4,
                    fontSize: 12,
                  }}
                >
                  Committee
                </Button>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 99,
                  backgroundImage:
                    "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 10%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.6) 90%, rgba(0, 0, 0, 0.4) 100%)", // Gradient from left black to right transparent
                  //   opacity: 0.7,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* About Us Text Grid PC */}
      <Grid
        container
        id="OurJourney"
        sx={{
          marginY: 6,
          paddingX: 30,
          display: { xs: "none", md: "flex" },
        }}
      >
        {/* Text Container PC */}
        <Grid item xs={12} className="h-auto justify-center items-center ">
          <p className="font-Lobster-Regular text-6xl">Our Journey</p>
          <p className="font-Poppins-Regular text-[15px] text-left py-12">
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
          marginY: 3,
          marginTop: 0,
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
          <p className="font-Poppins-SemiBold text-5xl">
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
          <p className="font-Poppins-SemiBold text-5xl">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutUs;
