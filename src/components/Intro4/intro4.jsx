import React, { useState, useEffect } from "react";
import particlesConfig from "../../config/particle-config";
import particlesBlackConfig from "../../config/pr-s-black";
import Particles from "react-tsparticles";

const empowerPhrases = [
  "Creativity is the process of having original ideas.",
  "Empower your business with innovative strategies.",
  "Unleash the potential of your commerce journey.",
  "Your success story begins with empowered decisions.",
];

const Intro4 = ({ sliderRef, blackStar }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhraseIndex(
        (prevIndex) => (prevIndex + 1) % empowerPhrases.length
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <header ref={sliderRef} className="particles circle-bg valign">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="cont text-center">
              <h1>
                {" "}
                <span className="color-font">
                  {empowerPhrases[currentPhraseIndex]}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <Particles
        id="particles-js"
        options={blackStar ? particlesBlackConfig : particlesConfig}
      />

      <div className="gradient-circle"></div>
      <div className="gradient-circle two"></div>
      <div className="line bottom left"></div>
    </header>
  );
};

export default Intro4;
