import React, { useState, useEffect } from "react";
import "./Alojamiento.css";
import MapComponent from "../../components/mapa/MapComponent";
import { useParams } from "react-router-dom";
import Carrusel from "../../components/carrusel/Carrusel";

const Alojamiento = () => {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/alojamiento/getAlojamiento/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          const tipoResponse = await fetch(
            `http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${data.idTipoAlojamiento}`
          );
          if (tipoResponse.ok) {
            const tipoData = await tipoResponse.json();
            setAlojamiento({
              ...data,
              TipoAlojamiento: tipoData.Descripcion,
            });
          } else {
            console.error("Error al obtener el tipo de alojamiento.");
            return alojamiento;
          }
        } else {
          console.error("Error al obtener el alojamiento.");
        }
      } catch (error) {
        console.error("Error al conectarse con la API:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="alojamiento">
      {alojamiento ? (
        <>
          <div className="chapa"></div>
          <section className="contenido">
            <h1>{alojamiento.Titulo}</h1>

            <div className="lugar separador">
              <div className="fotos">
                <Carrusel>
                  <img src="/images/img1.jpeg" />
                  <img src="/images/img3.jpeg" />
                  <img src="/images/img4.jpeg" />
                  <img src="/images/img2.jpeg" />
                </Carrusel>
              </div>

              {/* <img className="foto-principal" src="/images/img1.jpeg" />
              <div className="fotos">
                <img src="/images/img3.jpeg" />
                <img src="/images/img4.jpeg" />
                <img src="/images/img2.jpeg" />
                <div className="foto-ver-mas">
                  <img src="/images/img2.jpeg" />
                  <p>Ver más...</p>
                </div>
              </div> */}
            </div>
            <div className="detalles-alojamiento separador">
              <div className="descripcion-alojamiento ">
                <h2>{alojamiento.TipoAlojamiento}</h2>
                <p>
                  Dormitorios: {alojamiento.CantidadDormitorios} | Baños:{" "}
                  {alojamiento.CantidadBanios} | Precio por día:{" "}
                  {alojamiento.PrecioPorDia}
                </p>
                <div className="especificaciones-alojamiento">
                  <ul>
                    <strong>Este alojamiento cuenta con:</strong>
                    <li>
                      <img
                        src="/servicios/wifi.svg"
                        alt="wifi"
                        title="wifi"
                        className="servicio-img"
                      />
                      <strong>Wifi </strong>
                    </li>

                    {alojamiento.ServicioWifi}
                    <li>
                      <img
                        src="/servicios/estacionamiento.svg"
                        alt="cochera"
                        title="Cochera"
                        className="servicio-img"
                      />
                      <strong> Cochera </strong>
                    </li>
                    <li>
                      <img
                        src="/servicios/aire.svg"
                        alt="aire"
                        title="Aire"
                        className="servicio-img"
                      />
                      <strong>Aire Acondicionado </strong>
                    </li>
                    <li>
                      <img
                        src="/servicios/pileta.svg"
                        alt="pileta"
                        title="Pileta"
                        className="servicio-img"
                      />
                      <strong>Pileta </strong>
                    </li>
                    {/* <p>
                Este alojamiento está bien posicionado, teniendo en cuenta sus
                calificaciones, evaluaciones y fiabilidad.
              </p> */}
                    <strong>Descripción</strong>
                    <li>
                      <p>{alojamiento.Descripcion}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="contenedor-mapa">
                <h2>Ubicación </h2>
                <MapComponent alojamiento={alojamiento} />
              </div>
            </div>
          </section>
        </>
      ) : (
        "Cargando"
      )}
    </main>
  );
};

export default Alojamiento;
