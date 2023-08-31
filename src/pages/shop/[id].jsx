import React from "react";
import LightTheme from "../../layouts/Light";
import Navbar from "../../components/Navbar/navbar";
import Footer2 from "../../components/Footer2/footer2";
import BlogDetails from "../../components/Blog-details/blog-details";
import Intro5 from "../../components/Intro5/intro5";
import ProductDetail from "../../components/Product-detail/product-detail";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsById } from "../../../redux/reducers/products";

const Detaills = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState(null);
  const { productDetail } = useSelector((state) => state.products);
  const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  React.useEffect(() => {
    if (router.query.id) {
      dispatch(fetchProductsById(router.query.id));
    }
  }, [dispatch, router.query.id]);

  React.useEffect(() => {
    if (productDetail) {
      setProduct(productDetail);
    }
  }, [productDetail]);

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
  return (
    <LightTheme>
      <Navbar nr={navbarRef} lr={logoRef} theme="themeL" />
      <div ref={MainContent} className="main-content">
        {product !== null ? (
          <ProductDetail product={product} />
        ) : (
          <div>
            <h1>Cargando...</h1>
          </div>
        )}

        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Detaills;
