import React, { useState, useEffect } from "react";
import CardList from "../cards/CardList";
import "./buscador.css";

const Buscador = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/alojamiento/getAlojamientos"
        );

        if (response.ok) {
          const data = await response.json();
          const alojamientosDetalles = await Promise.all(
            data.map(async (alojamiento) => {
              const tipoResponse = await fetch(
                `http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${alojamiento.idTipoAlojamiento}`
              );
              if (tipoResponse.ok) {
                const tipoData = await tipoResponse.json();
                return {
                  ...alojamiento,
                  TipoAlojamiento: tipoData.Descripcion,
                };
              } else {
                console.error("Error al obtener el tipo de alojamiento.");
                return alojamiento;
              }
            })
          );
          setAlojamientos(alojamientosDetalles);
        } else {
          console.error("Error al obtener los alojamientos.");
        }
      } catch (error) {
        console.error("Error al conectarse con la API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="buscador">
      <div className="chapa"></div>
      <section className="contenido">
        <CardList
          lista={alojamientos}
          titulo="Encontrá tu próximo destino"
        ></CardList>
      </section>
    </div>
  );
};

export default Buscador;
