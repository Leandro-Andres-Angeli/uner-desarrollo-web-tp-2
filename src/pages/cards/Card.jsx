import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

const Card = ({ item }) => {
  return (
    <div className="tarjeta-alojamiento">
      <Link to="/alojamiento">
        <div>
          <img src="images/img7.png" alt="" />
        </div>
        <div className="descripcion-alojamiento">
          <h3>
            <strong>{item.titulo}</strong>
          </h3>
          <p>Tipo: {item.tipoAlojamiento}</p>
          {/* <p>
            Ubicación:
            <br />
            Latitud:{item.ubicacion.latitud}
            <br />
            Longitud:{item.ubicacion.longitud}
          </p> */}
          <p>Disponibilidad: {item.estado}</p>
          <p>Dormitorios: {item.dormitorios}</p>
          <p>Baños: {item.banos}</p>
          <p>
            <strong>{item.precio} </strong>noche
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
