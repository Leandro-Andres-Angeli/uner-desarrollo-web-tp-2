import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

const Card = () => {
  return (
    <div className="tarjeta-alojamiento">
      <Link to="/alojamiento">
        <div>
          <img src="images/img7.png" alt="" />
        </div>
        <div className="descripcion-alojamiento">
          <h3>
            <strong>Buenos Aires, Argentina</strong>
          </h3>
          <p>Distacia: 17km</p>
          <p>Disponibilidad:</p>
          <p>
            <strong>$44 uds </strong>noche
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
