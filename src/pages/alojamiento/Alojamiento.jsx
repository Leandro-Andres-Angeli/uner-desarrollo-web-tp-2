import React, { useState, useEffect } from "react";
import "./Alojamiento.css";
import MapComponent from "../../components/mapa/MapComponent";
import { useParams } from "react-router-dom";
import Carrusel from "../../components/carrusel/Carrusel";
import handleCRUD from "../../utils/handleCrud";
import {
  crudAlojamientosEndpoints,
  crudImagenes,
} from "../../dbEndpointsAlojamiento";
import { crudTipoAlojamientosEndpoints } from "../../dbEndpoints";

const Alojamiento = () => {
  const { id } = useParams();
  const intialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
  };

  const [alojamiento, setAlojamiento] = useState(intialState);
  const [alojamientoJoined, setAlojamientoJoined] = useState(intialState);
  const [tipoAlojamiento, setTipoAlojamiento] = useState(intialState);
  const [imagenes, setImagenes] = useState(intialState);
  const [imagenesCarrusel, setImagenesCarrusel] = useState([]);
  const [imagenPrincipal, setImagenPrincipal] = useState("");

  useEffect(() => {
    const cargar = async () => {
      await handleCRUD(
        `${crudAlojamientosEndpoints.readOne}/${id}`,
        undefined,
        setAlojamiento
      );
      await handleCRUD(crudImagenes.readAll, undefined, setImagenes);
    };
    cargar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      await handleCRUD(
        `${crudTipoAlojamientosEndpoints.readOne}/${alojamiento.data.idTipoAlojamiento}`,
        undefined,
        setTipoAlojamiento
      );
    };

    if (alojamiento.done) {
      cargar();
    }
  }, [alojamiento]);

  useEffect(() => {
    if (alojamiento.done && tipoAlojamiento.done && imagenes.done) {
      setAlojamientoJoined(() => {
        return {
          ...alojamiento.data,
          done: true,
          TipoAlojamiento: tipoAlojamiento.data.Descripcion,
          Imagenes: imagenes.data.filter(
            (imagen) => imagen.idAlojamiento === alojamiento.data.idAlojamiento
          ),
        };
      });
    }
  }, [alojamiento, tipoAlojamiento, imagenes]);

  useEffect(() => {
    if (alojamientoJoined.done && alojamientoJoined.Imagenes.length > 0) {
      setImagenPrincipal(alojamientoJoined.Imagenes[0].RutaArchivo);
      const imgs = cortarArray(alojamientoJoined.Imagenes, 4);
      setImagenesCarrusel(imgs);
    }
  }, [alojamientoJoined]);

  const cortarArray = (array, size) => {
    if (array.length <= size) {
      return [array];
    }
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  return (
    <main className="alojamiento">
      {alojamientoJoined.done ? (
        <>
          <div className="chapa"></div>
          <section className="contenido">
            <h1>{alojamientoJoined.Titulo}</h1>

            <div className="lugar separador">
              {alojamientoJoined.Imagenes.length > 0 && (
                <>
                  <img className="foto-principal" src={imagenPrincipal} />
                  {alojamientoJoined.Imagenes.length > 1 && (
                    <div className="fotos-container">
                      <Carrusel>
                        {imagenesCarrusel.map((porcion, index) => {
                          return (
                            <div key={index} className="fotos">
                              {porcion.map((img, idx) => {
                                return (
                                  <img
                                    key={idx}
                                    src={img.RutaArchivo}
                                    onClick={() =>
                                      setImagenPrincipal(img.RutaArchivo)
                                    }
                                  />
                                );
                              })}
                            </div>
                          );
                        })}
                      </Carrusel>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="detalles-alojamiento separador">
              <div className="descripcion-alojamiento ">
                <h2>{alojamientoJoined.TipoAlojamiento}</h2>
                <p>
                  Dormitorios: {alojamientoJoined.CantidadDormitorios} | Baños:{" "}
                  {alojamientoJoined.CantidadBanios} | Precio por día:{" "}
                  {alojamientoJoined.PrecioPorDia}
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

                    {alojamientoJoined.ServicioWifi}
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
                      <p>{alojamientoJoined.Descripcion}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="contenedor-mapa">
                <h2>Ubicación </h2>
                <MapComponent alojamiento={alojamientoJoined} />
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
