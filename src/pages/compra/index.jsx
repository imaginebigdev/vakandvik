import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import LightTheme from "../../layouts/Light";
import Footer2 from "../../components/Footer2/footer2";
import Swal from "sweetalert2";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setItems } from "../../../redux/reducers/cart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useRouter } from "next/dist/client/router";
import MinimalArea2 from "../../components/Minimal-Area2/minimal-area2";
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
      await axios
        .post(`${url}orders`, { ...dataUser[0] })
        .then((res) => {
          setIDataUser([]);
          setItemCart([]);
          dispatch(setItems([]));
          Swal.fire({
            icon: "success",
            title: "Compra realizada exitosamente",
            text: "Su compra se realizo de manera exitosa",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Ocurrio un error",
            text: "Ha ocurrido un error con su compra",
          });
        });
    }
    fetchData();
  }, []);

  return (
    <LightTheme mobileappstyle>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <div className="main-content">
        <MinimalArea2 />
        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Homepage1;
