/* eslint-disable @next/next/no-css-tags */

import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/reducers/products";

SwiperCore.use([Navigation]);

const Works2 = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    });
  }, []);

  useEffect(() => {
    // Llama a la función para obtener los productos destacados
    dispatch(fetchProducts());
  }, [dispatch]);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/ionicons.min.css" />
      </Head>
      <section className="work-carousel section-padding caroul position-re pb-0">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="sec-head text-center">
                <h6 className="wow fadeIn" data-wow-delay=".5s">
                  Productos destacados:
                </h6>
                <h3 className="wow color-font">
                  Encuentra lo mejor en <br /> diseño & estilo.
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 no-padding">
              <div className="swiper-container">
                <Swiper
                  speed={1000}
                  loop={true}
                  spaceBetween={0}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    767: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                    },
                    991: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 0,
                    },
                  }}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                  }}
                  onSwiper={(swiper) => {
                    setTimeout(() => {
                      swiper.params.navigation.prevEl =
                        navigationPrevRef.current;
                      swiper.params.navigation.nextEl =
                        navigationNextRef.current;

                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                  className="swiper-wrapper"
                  slidesPerView={1}
                >
                  {products
                    .filter((product) => product.is_relevant)
                    .map((product, index) => (
                      <SwiperSlide key={index} className="swiper-slide">
                        <Link href={`/shop/${product.id}`}>
                          <div
                            className="content wow fadeInUp"
                            data-wow-delay=".3s"
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className="item-img bg-img wow imago"
                              style={{
                                backgroundImage: `url(${product.image})`, // Asegúrate de que el objeto de producto tenga una propiedad "image" adecuada
                              }}
                            ></div>
                            <div className="cont bgbox">
                              <h4 style={{ color: "#ef8152ff" }}>
                                {product.name}
                              </h4>
                              <h4 style={{ color: "#6c757dff" }}>
                                $ {product.price}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                </Swiper>

                <div
                  ref={navigationNextRef}
                  className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer"
                >
                  <i className="ion-ios-arrow-right"></i>
                </div>
                <div
                  ref={navigationPrevRef}
                  className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer"
                >
                  <i className="ion-ios-arrow-left"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Works2;
