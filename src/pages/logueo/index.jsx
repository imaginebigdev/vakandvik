/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import Footer from "../../components/Footer/footer";

import LogueoForm from "../../components/Logueo-form/logueo-form";
import LightTheme from "../../layouts/Light";
import Footer2 from "../../components/Footer2/footer2";

const Logueo = () => {
  React.useEffect(() => {
    document.querySelector("body").classList.add("contact-page");

    return () => {
      document.querySelector("body").classList.remove("contact-page");
    };
  });

  return (
    <LightTheme>
      <div className="main-content">
        <LogueoForm />
        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Logueo;
