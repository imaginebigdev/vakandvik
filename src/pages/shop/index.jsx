import React from "react";
import Navbar from "../../components/Navbar/navbar";
import CallToAction from "../../components/Call-to-action/call-to-action";
import LightTheme from "../../layouts/Light";
import Shop from "../../components/Shop/shop";

import Footer2 from "../../components/Footer2/footer2";

const About = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    var navbar = navbarRef.current,
      logo = logoRef.current;
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
  }, [navbarRef]);
  return (
    <LightTheme mobileappstyle>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />

      <Shop />
      <CallToAction />
      <Footer2 />
    </LightTheme>
  );
};

export default About;
