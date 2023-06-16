/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import initIsotope from "../../common/initIsotope";

const WorksStyle4 = () => {
  const products = [
    {
      id: 1,
      name: "Cartera Marron demo",
      description: "Cartera marron demo descripción",
      img: "https://carterasybolsosdemarca.com/upload/productos/portada/normal/cartera-kelly-de-hermes-modelo-byc3075kelly-a0b5fdf3b820fef7f83a0eb3a1f3ad17.webp",
    },
    {
      id: 2,
      name: "Cartera negra demo",
      description: "Cartera negra demo descripción",
      img: "https://thumbs.dreamstime.com/b/nueva-cartera-negra-de-cuero-ganado-aislado-genuino-vacuno-sin-sombras-en-fondo-blanco-captura-cierre-195831673.jpg",
    },
    {
      id: 3,
      name: "Cartera Marron 2 demo",
      description: "Cartera marron demo descripción",
      img: "https://thumbs.dreamstime.com/b/bolso-para-mujer-del-negocio-oficinista-en-la-mesa-de-madera-el-fondo-borroso-oficina-cartera-cuero-empresaria-accesorios-concepto-201859056.jpg",
    },
    {
      id: 4,
      name: "Cartera negra 2 demo",
      description: "Cartera negra 2 demo descripción",
      img: "https://cdn.shopify.com/s/files/1/0553/7136/6485/products/73133_H_1.jpg?v=1663596285",
    },
  ];
  React.useEffect(() => {
    setTimeout(() => {
      initIsotope();
    }, 1000);
  }, []);
  return (
    <section className="portfolio-frl section-padding pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="sec-head  text-center">
              <h6 className="wow fadeIn" data-wow-delay=".5s">
                Portfolio
              </h6>
              <h3 className="wow color-font">
                Our Recent Web Design & <br /> Some Past Projects.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="gallery full-width">
            {products?.map((p) => (
              <div
                key={p.id}
                className="col-md-6 items graphic lg-mr wow fadeInUp"
                data-wow-delay=".4s"
              >
                <div className="item-img">
                  <div className="cont">
                    <h6>{p.name}</h6>
                    <p>{p.description}</p>
                  </div>
                  <Link href={`/shop/${p.id}`}>
                    <a className="rota">
                      <img src={p.img} alt="image" />
                      <div className="item-img-overlay"></div>
                    </a>
                  </Link>
                  <div className="tags">
                    <span>
                      <Link href={`/shop/${p.id}`}>Ver más</Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksStyle4;
