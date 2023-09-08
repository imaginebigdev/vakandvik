/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { Link as ScrollLink } from "react-scroll";

const BlogDetails = ({ theme }) => {
  const messageRef = React.useRef(null);
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  const sendMessage = (ms) => new Promise((r) => setTimeout(r, ms));

  return (
    <section className="blog-pg single section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="post">
              <div className="content pt-60">
                <div className="row justify-content-center">
                  <div className="col-lg-10 text-center">
                    <div className="cont">
                      <h4 className="extra-title">
                        ¿Qué hace que sus productos de diseño sean únicos?
                      </h4>
                      <div className="spacial">
                        <p>
                          Nuestros productos de diseño son únicos gracias a la
                          cuidadosa selección de materiales de alta calidad, el
                          talento de nuestros diseñadores y la atención
                          meticulosa a los detalles. Cada artículo es creado con
                          pasión y creatividad para ofrecerte productos
                          excepcionales que destacan.
                        </p>
                      </div>
                      <h4 className="extra-title">
                        ¿Puedo personalizar un producto con mi propio diseño?
                      </h4>

                      <p>
                        ¡Absolutamente! Ofrecemos la opción de personalizar
                        muchos de nuestros productos con tu diseño o logotipo
                        personal. Simplemente contáctanos y trabajaremos contigo
                        para llevar a cabo tu idea y crear un producto exclusivo
                        que se ajuste a tus necesidades.
                      </p>
                      <h4 className="extra-title">
                        ¿Cómo puedo cuidar y mantener mis productos de diseño en
                        buen estado?
                      </h4>
                      <p>
                        Para mantener tus productos de diseño en óptimas
                        condiciones, te recomendamos seguir las instrucciones de
                        cuidado específicas que proporcionamos con cada
                        artículo. En general, evita la exposición prolongada a
                        la luz solar directa, la humedad excesiva y líquidos
                        derramados. Limpia las manchas suavemente con un paño
                        húmedo y, si es necesario, consulta con nosotros para
                        obtener recomendaciones adicionales de cuidado.
                      </p>

                      <div className="quotes text-center">
                        <p>
                          {'"'}El ARTE tiene la capacidad de transformar un
                          espacio cualquiera en un lugar que sea verdaderamente
                          tuyo, impregnado de tu personalidad... Lo mismo pasa
                          con los elementos que usamos en el día a día.{'"'}
                        </p>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-10">
                            <img src="/img/blog/1.jpg" alt="" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-10">
                            <img src="/img/blog/2.jpg" alt="" />
                          </div>
                        </div>
                      </div>

                      <div className="share-info">
                        <div className="social">
                          <a
                            href="https://www.instagram.com/vakandvik_/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                          <a
                            href="https://wa.me/5493513864255"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
