import React from "react";
import Navbar from "../../components/Navbar/navbar";
import LightTheme from "../../layouts/Light";
import Footer2 from "../../components/Footer2/footer2";
import AboutUs from "../../components/About-us/about-us";
import Swal from "sweetalert2";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
const url = process.env.NEXT_APP_URL_BACK;
const key_admin = process.env.NEXT_APP_KEY_ADMIN;

const Homepage1 = () => {
  const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

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

  React.useEffect(() => {
    async function fetchOrderById() {
      const orderId = window.localStorage.getItem("paymentUser");
      console.log(orderId);
      if (!orderId) {
        return router.push("/");
      }
      const orderBack = await axios.get(`${url}orders/${orderId}`);
      if (orderBack) {
        await axios.delete(`${url}orders/${orderId}`, {
          data: { key_admin: key_admin },
        });
        window.localStorage.setItem("paymentUser", "");

        Swal.fire({
          icon: "warning",
          title: "Error al comprar",
          text: "Su compra fue rechazada o hubo un error, por favor contactese si cree que se pago correctamente, sera redirigido al carrito",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/carrito");
          }
        });
      }
    }
    fetchOrderById();
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
