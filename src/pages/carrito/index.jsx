/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import LightTheme from "../../layouts/Light";
import Footer2 from "../../components/Footer2/footer2";
import CartComponent from "../../components/Cart/Cart-component";
import NavbarCart from "../../components/Navbar/navbar-cart";
import ContactHeader from "../../components/Contact-header/contact-header";
import { useState } from "react";
import FormCheckout from "../../components/form-checkout/form-checkout";

const Carrito = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [modal, setModal] = useState(false);

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
        <CartComponent setModal={setModal} modal={modal} />
        <FormCheckout setModal={setModal} modal={modal} />
        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Carrito;
