/* eslint-disable @next/next/no-img-element */
import React from "react";
import AboutUs1Date from "../../data/sections/about-us1.json";

const AboutUs = () => {
  return (
    <section className="about-us section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 valign md-mb50">
            <div className="mb-50">
              <h6 className="fw-100 text-u ls10 mb-10">
                {AboutUs1Date.smallTitle}
              </h6>
              <h3 className="fw-600 text-u ls1 mb-30 color-font">
                {AboutUs1Date.title}
              </h3>
              <p>{AboutUs1Date.content}</p>
            </div>
          </div>
          <div className="col-lg-7 img">
            <img src={AboutUs1Date.image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
