import React from "react";
import CardList from "../cards/CardList";
import lista from "../../data/BD_alojamientos.json";
import "./buscador.css";

const Buscador = () => {
  console.log(lista);
  return (
    <div className="buscador">
      <div className="chapa"></div>
      <section className="contenido">
        <CardList
          lista={lista.alojamientos}
          titulo="Encontrá tu próximo destino"
        ></CardList>
      </section>
    </div>
  );
};

export default Buscador;
