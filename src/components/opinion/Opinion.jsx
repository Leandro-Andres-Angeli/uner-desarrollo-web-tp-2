import React from "react";
import "./Opinion.css";

function Opinion({ opinion }) {
  return (
    <div className="contenedor-opinion">
      <img
        className="imagen-opinion"
        src={`./images/opiniones/${opinion.imagen}.jpg`}
        alt={`Foto de ${opinion.imagen}`}
      />
      <div className="contenedor-texto-opinion">
        <p className="frase-opinion">
          {" "}
          <strong>{opinion.frase}</strong>
        </p>
        <p className="nombre-opinion">
          {opinion.nombre} en {opinion.lugar}
        </p>
        <p className="texto-opinio">"{opinion.opinion}"</p>
      </div>
    </div>
  );
}

export default Opinion;
