import { Box, Fab, Grid } from "@mui/material";
import { useEffect, useState } from "react";

function ScrollToTopButton() {
  // useEffect for scroll visibility and cleanup
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render
  // Scroll Buttons
  const handleScrollToGrid = (id) => {
    const gridElement = document.getElementById(id);
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: isVisible ? "block" : "none",
        zIndex: 999,
      }}
    >
      <Fab color="primary" aria-label="scroll to top" onClick={scrollToTop}>
        {/* <KeyboardArrowUpIcon /> */}
        <p>Up</p>
      </Fab>
    </div>
  );
}

export default ScrollToTopButton;
