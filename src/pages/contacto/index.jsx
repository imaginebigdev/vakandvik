/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import Navbar from "../../components/Navbar/navbar";
import LightTheme from "../../layouts/Light";
import ContactHeader from "../../components/Contact-header/contact-header";
import ContactForm from "../../components/Contact-form/contact-form";
import Footer2 from "../../components/Footer2/footer2";

const Contact = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    document.querySelector("body").classList.add("contact-page");
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
    return () => {
      document.querySelector("body").classList.remove("contact-page");
    };
  }, [navbarRef]);

  return (
    <LightTheme mobileappstyle>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <ContactHeader blackStar />
      <div className="main-content">
        <ContactForm />

        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Contact;
