/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import LightTheme from "../../layouts/Light";
import Footer2 from "../../components/Footer2/footer2";
import CartComponent from "../../components/Cart/Cart-component";
import NavbarCart from "../../components/Navbar/navbar-cart";
import ContactHeader from "../../components/Contact-header/contact-header";

const Carrito = () => {
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
      <NavbarCart nr={navbarRef} lr={logoRef} theme="themeL" />
      <ContactHeader blackStar />
      <div className="main-content">
        <CartComponent />
        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Carrito;
