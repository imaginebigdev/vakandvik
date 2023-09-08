import React from "react";
import integration from "../../data/sections/integration.json";

const IntegrationEsp = () => {
  return (
    <div className="integration pt-100" data-scroll-index="3">
      <div className="section-head text-center style-4">
        <h5 className="color-font">Nuestro Stack</h5>
        <h2 className="mb-20">
          Nosotros usamos un Stack <span className="color-font"> MERN</span>{" "}
        </h2>
        <p>Realizamos tu proyecto con tecnologías de última generación.</p>
      </div>
      <div className="container">
        <div className="content d-flex justify-content-center align-items-center">
          {integration[0].imageUrl.map((imageUrl, index) => (
            <div className="img" key={index}>
              <img
                style={{ width: "100px", height: "100px" }}
                src={imageUrl}
                alt=""
                className="mt-30"
              />
            </div>
          ))}
        </div>
      </div>
      <img src="/img/admin/intg_back.png" alt="" className="intg-back" />
    </div>
  );
};

export default IntegrationEsp;
