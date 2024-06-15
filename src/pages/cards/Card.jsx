import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

const Card = ({ item }) => {
  return (
    <div className="tarjeta-alojamiento">
      <Link to={`/alojamiento/${item.idAlojamiento}`}>
        <div>
          <img src="images/img7.png" alt="" />
        </div>
        <div className="tarjeta-descripcion">
          <h3>
            <strong>
              {item.TipoAlojamiento} en {item.Titulo}
            </strong>
          </h3>
          {/* <p>
            Ubicación:
            <br />
            Latitud:{item.ubicacion.latitud}
            <br />
            Longitud:{item.ubicacion.longitud}
          </p> */}
          <p>{item.Estado}</p>
          <p>Dormitorios: {item.CantidadDormitorios}</p>
          <p>Baños: {item.CantidadBanios}</p>
          <p>
            <strong>${item.PrecioPorDia} </strong>día
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
