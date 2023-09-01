import React from "react";

const Footer2 = () => {
  return (
    <footer className="app-footer" data-overlay-dark="0">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="item-clumn our md-mb50">
              <a href="#0" className="logo-brand mb-50">
                <img src="/img/admin/logo-vk.png" alt="" />
              </a>
              <p>
                Únete a la experiencia Vakandvik y lleva contigo un toque de
                creatividad y estilo en cada producto. ¡Espero que disfrutes de
                nuestras creaciones tanto como yo disfruto diseñándolas!
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-clumn links md-mb50">
              <h5 className="title" style={{ color: "#000" }}>
                Navegación
              </h5>
              <ul>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="#0">Inicio</a>
                </li>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="#0">Shop</a>
                </li>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="#0">Información</a>
                </li>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="#0">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="item-clumn links sm-mb50">
              <h5 className="title" style={{ color: "#000" }}>
                Producción{" "}
              </h5>
              <ul>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="#0">Soporte</a>
                </li>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="#0">Privacidad</a>
                </li>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="#0">Configuración</a>
                </li>
                <li>
                  <span
                    className="icon pe-7s-angle-right"
                    style={{ color: "#000" }}
                  ></span>
                  <a href="0">E-commerce</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-clumn links">
              <h5 className="title mb-30" style={{ color: "#000" }}>
                Contacto
              </h5>
              <div className="info" style={{ color: "#000" }}>
                <span style={{ color: "#000" }}>Email</span>
                <h6 style={{ color: "#000" }}>support@gmail.com</h6>
              </div>
              <div className="social mt-30">
                <a href="#0">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#0">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#0">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#0">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <p>
                  © 2023{" "}
                  <a
                    href="https://www.imaginebig.dev/es/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9913b6ff" }}
                  >
                    ImagineBig
                  </a>
                  . Todos los derechos reservados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="circle-blur"></div>
      <div className="circle-blur two"></div>
    </footer>
  );
};

export default Footer2;
