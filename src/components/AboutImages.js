import React from "react";
import img5 from './images/img5.jpg';
import img6 from './images/img6.jpg';
import img7 from './images/img7.jpg';

const AboutImages = () => {
  return (
    <section class="imagen-container">
      <figure>
        <div class="imagen">
          <img src={img5} alt="Alojamiento con piscina" />
        </div>
      </figure>
      <figure>
        <div class="imagen">
          <img src={img6} alt="Alojamiento al mar" />
        </div>
      </figure>
      <figure>
        <div class="imagen">
          <img src={img7} alt="Camas" />
        </div>
      </figure>
    </section>
  );
};

export default AboutImages;
