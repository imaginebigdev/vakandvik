/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Link from "next/link";
import { thumparallaxDown } from "../../common/thumparallax";

const MinimalArea2 = () => {
  React.useEffect(() => {
    setTimeout(() => {
      thumparallaxDown();
    }, 1000);
  }, []);
  return (
    <section className="min-area pt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="img">
              <img
                className="thumparallax-down"
                src="/img/min-area.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="content">
              <h4 className="color-font">
                ¡Gracias por Tu Compra en Vakandvik! Pronto Recibirás las
                Instrucciones de Envío
              </h4>
              <p className="wow txt words chars splitting" data-splitting>
                ¡Enhorabuena! Has completado tu compra en Vakandvik, donde el
                diseño y el arte se unen para crear experiencias únicas.
                Apreciamos tu confianza en nosotros.
              </p>
              <br />
              <p>
                En breve, recibirás un correo electrónico que contiene todas las
                instrucciones detalladas para el envío de tu pedido. Queremos
                asegurarnos de que tu experiencia de compra sea lo más fluida y
                satisfactoria posible.
              </p>
              <br />
              <p>
                Si tienes alguna pregunta o necesitas asistencia adicional, no
                dudes en contactarnos a través de nuestro servicio de atención
                al cliente. Estamos aquí para ayudarte en cada paso del camino.
              </p>
              <br />
              <p>
                Gracias de nuevo por elegir Vakandvik. Esperamos que disfrutes
                de tu compra y que nuestros productos aporten una chispa de
                creatividad y belleza a tu vida. ¡Esperamos verte pronto de
                nuevo!
              </p>
              <br />

              <Link href={`/`}>
                <a className="butn bord curve mt-40">
                  <span>Volver a inicio</span>
                </a>
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalArea2;
