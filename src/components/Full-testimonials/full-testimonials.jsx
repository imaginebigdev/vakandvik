/* eslint-disable @next/next/no-img-element */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class FullTestimonials extends React.Component {
  constructor(props) {
    super(props);
  }
  renderArrows = () => {
    return (
      <div className="arrows">
        <div className="container">
          <div
            onClick={() => this.slider.slickNext()}
            className="next cursor-pointer"
          >
            <span className="pe-7s-angle-right"></span>
          </div>
          <div
            onClick={() => this.slider.slickPrev()}
            className="prev cursor-pointer"
          >
            <span className="pe-7s-angle-left"></span>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <section
        className={`testimonials ${
          this.props.withIMG
            ? "section-padding bg-img"
            : this.props.withCOLOR
            ? "section-padding back-color"
            : this.props.noPadding
            ? ""
            : "section-padding"
        } ${this.props.classText ? this.props.classText : ""}`}
        style={{
          backgroundImage: `${
            this.props.withIMG ? "url(/img/testim-img.jpg)" : "none"
          }`,
        }}
      >
        {this.props.showHead && (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="sec-head  text-center">
                  <h6 className="wow fadeIn" data-wow-delay=".5s">
                    Testimonios
                  </h6>
                  <h3 className="wow color-font">
                    Lo que nuestros clientes dicen...
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container-fluid position-re">
          <div className="row wow fadeInUp" data-wow-delay=".5s">
            <div className="col-lg-12">
              <Slider
                className="slic-item"
                {...{
                  ref: (c) => (this.slider = c),
                  dots: false,
                  infinite: true,
                  arrows: true,
                  centerMode: true,
                  autoplay: true,
                  rows: 1,
                  slidesToScroll: 1,
                  slidesToShow: 3,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 1,
                        centerMode: false,
                      },
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1,
                        centerMode: false,
                      },
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        centerMode: false,
                      },
                    },
                  ],
                }}
              >
                <div className="item">
                  <div className="info valign">
                    <div className="cont">
                      {/*      <div className="author">
                        <div className="img">
                          <img src="/img/clients/1.jpg" alt="" />
                        </div>
                        <h6 className="author-name color-font">
                          Alex Regelman
                        </h6>
                        <span className="author-details">
                          Co-founder, Colabrio
                        </span>
                      </div> */}
                    </div>
                  </div>
                  <p>
                    "Como viajero frecuente, necesito productos que sean
                    duraderos y versátiles. Las mochilas de Vakandvik son
                    ideales para mis aventuras. Tienen el espacio perfecto y un
                    diseño que se adapta a cualquier entorno. Sin duda,
                    Vakandvik se ha convertido en mi elección número uno para
                    accesorios de viaje."
                  </p>
                </div>
                <div className="item">
                  <div className="info valign">
                    <div className="cont">
                      {/*   <div className="author">
                        <div className="img">
                          <img src="/img/clients/1.jpg" alt="" />
                        </div>
                        <h6 className="author-name color-font">
                          Alex Regelman
                        </h6>
                        <span className="author-details">
                          Co-founder, Colabrio
                        </span>
                      </div> */}
                    </div>
                  </div>
                  <p>
                    "La calidad y la artesanía de Vakandvik son excepcionales.
                    Mi campera de Vakandvik me ha mantenido abrigada y con
                    estilo durante todo el invierno. Además, me hace sentir bien
                    saber que están comprometidos con la sostenibilidad y el
                    comercio ético."
                  </p>
                </div>
                <div className="item">
                  <div className="info valign">
                    <div className="cont">
                      {/*    <div className="author">
                        <div className="img">
                          <img src="/img/clients/1.jpg" alt="" />
                        </div>
                        <h6 className="author-name color-font">
                          Alex Regelman
                        </h6>
                        <span className="author-details">
                          Co-founder, Colabrio
                        </span>
                      </div> */}
                    </div>
                  </div>
                  <p>
                    "Como amante de la moda y el diseño, siempre busco productos
                    que se destaquen. Vakandvik no solo se destaca, ¡sino que
                    supera mis expectativas! Mi bolso de Vakandvik es mi
                    accesorio imprescindible, y no puedo esperar para agregar
                    más productos de esta marca a mi colección."
                  </p>
                </div>
                <div className="item">
                  <div className="info valign">
                    <div className="cont">
                      {/*     <div className="author">
                        <div className="img">
                          <img src="/img/clients/1.jpg" alt="" />
                        </div>
                        <h6 className="author-name color-font">
                          Alex Regelman
                        </h6>
                        <span className="author-details">
                          Co-founder, Colabrio
                        </span>
                      </div> */}
                    </div>
                  </div>
                  <p>
                    "¡No puedo expresar lo encantada que estoy con mi mochila de
                    Vakandvik! No solo es hermosa, sino que también es
                    increíblemente resistente. La llevo a todas partes, desde la
                    oficina hasta mis escapadas de fin de semana, y siempre
                    recibo elogios por su diseño único."
                  </p>
                </div>
              </Slider>
            </div>
          </div>
          {this.renderArrows()}
        </div>
      </section>
    );
  }
}

export default FullTestimonials;
