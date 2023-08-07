import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import LightTheme from "../../layouts/Light";
import Footer2 from "../../components/Footer2/footer2";

import AboutUs3 from "../../components/About-us3/about-us3";
import AboutUs5 from "../../components/About-us5/about-us5";
import AboutUs from "../../components/About-us/about-us";
import Swal from "sweetalert2";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setItems } from "../../../redux/reducers/cart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/dist/client/router";
const url = process.env.NEXT_APP_URL_BACK;

const Homepage1 = () => {
  const dispatch = useDispatch();
  const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const [itemCart, setItemCart] = useLocalStorage("cart", []);
  const [dataUser, setIDataUser] = useLocalStorage("user", []);
  const router = useRouter();

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
    async function fetchData() {
      if (!dataUser.length) return router.push("/");
      await axios.post(`${url}orders`, { ...dataUser[0] });
      setIDataUser([]);
      setItemCart([]);
      dispatch(setItems([]));
      Swal.fire({
        icon: "success",
        title: "Compra realizada exitosamente",
        text: "Su compra se realizo de manera exitosa",
      });
    }
    fetchData();
  }, []);

  return (
    <LightTheme mobileappstyle>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <AboutUs />
      <Footer2 />
    </LightTheme>
  );
};

export default Homepage1;
