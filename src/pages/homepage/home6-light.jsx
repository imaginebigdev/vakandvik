import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import IntroWithSlider from "../../components/Intro-with-slider/intro-with-slider";
import LightTheme from "../../layouts/Light";
import FullTestimonials from "../../components/Full-testimonials/full-testimonials";
import Footer2 from "../../components/Footer2/footer2";
import WorksStyle3 from "../../components/Works-style3/works-style3";
import Works2 from "../../components/Works2/works2";

import AboutUs from "../../components/About-us/about-us";
import { useRouter } from "next/dist/client/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Swal from "sweetalert2";

const Homepage1 = () => {
  const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const router = useRouter();
  const [dataUser, setIDataUser] = useLocalStorage("user", []);

  React.useEffect(() => {
    setInterval(() => {
      if (fixedSlider.current) {
        var slidHeight = fixedSlider.current.offsetHeight;
      }
      if (MainContent.current) {
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);
    var navbar = navbarRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [fixedSlider, MainContent, navbarRef]);

  useEffect(() => {
    if (dataUser.length) {
      Swal.fire({
        icon: "warning",
        title: "Su compra tuvo un error",
        text: "Por favor revise los datos ingresados",
      }).then((result) => {
        if (result.isConfirmed) {
          setIDataUser([]);
          return router.push("/carrito");
        }
      });
    }
  }, []);

  return (
    <LightTheme mobileappstyle>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <IntroWithSlider sliderRef={fixedSlider} />
      <div ref={MainContent} className="main-content">
        <Works2 />
        <AboutUs />
        <WorksStyle3 />
        <FullTestimonials />
        <hr />
        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Homepage1;
