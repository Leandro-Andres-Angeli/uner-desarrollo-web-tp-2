import React, { useState, useEffect } from 'react';
import './Alojamiento.css';
import { useHistory } from 'react-router-dom';
import MapComponent from '../../components/mapa/MapComponent';
import { useParams } from 'react-router-dom';
import Carrusel from '../../components/carrusel/Carrusel';
import handleCRUD from '../../utils/handleCrud';
import {
  crudAlojamientosEndpoints,
  crudImagenes,
} from '../../dbEndpointsAlojamiento';
import { crudTipoAlojamientosEndpoints } from '../../dbEndpoints';
import {
  crudServiciosEndpoints,
  crudAlojamientoServiciosEndpoints,
} from '../../dbEndpointsServicios';
import { ArrowBack } from '../../icons/ArrowBack';
import Servicios from './Servicios';
import alojImgsRoute from '../../utils/publicImagesAlojRoutes';

const Alojamiento = () => {
  const history = useHistory();
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
  const [servicios, setServicios] = useState(intialState);
  const [alojamientoServicios, setAlojamientoServicios] = useState(intialState);
  const [imagenesCarrusel, setImagenesCarrusel] = useState([]);
  const [imagenPrincipal, setImagenPrincipal] = useState('');

  useEffect(() => {
    const cargar = async () => {
      await handleCRUD(
        `${crudAlojamientosEndpoints.readOne}/${id}`,
        undefined,
        setAlojamiento
      );
      await handleCRUD(crudImagenes.readAll, undefined, setImagenes);
      await handleCRUD(
        `${crudServiciosEndpoints.readAll}`,
        undefined,
        setServicios
      );
      await handleCRUD(
        `${crudAlojamientoServiciosEndpoints.readAll}`,
        undefined,
        setAlojamientoServicios
      );
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
    if (
      alojamiento.done &&
      tipoAlojamiento.done &&
      imagenes.done &&
      alojamientoServicios.done &&
      servicios.done
    ) {
      const serviciosDelAlojamiento = alojamientoServicios.data.filter(
        (alojamientoServicio) => {
          return (
            alojamientoServicio.idAlojamiento === alojamiento.data.idAlojamiento
          );
        }
      );
      setAlojamientoJoined(() => {
        return {
          ...alojamiento.data,
          done: true,
          TipoAlojamiento: tipoAlojamiento.data.Descripcion,
          Imagenes: imagenes.data.filter((imagen) => {
            return imagen.idAlojamiento === alojamiento.data.idAlojamiento;
          }),
          Servicios: servicios.data.filter((servicio) => {
            if (
              serviciosDelAlojamiento.length > 0 &&
              serviciosDelAlojamiento.some((alojamientoServicio) => {
                return alojamientoServicio.idServicio === servicio.idServicio;
              })
            ) {
              return true;
            }
          }),
        };
      });
    }
  }, [alojamiento, tipoAlojamiento, imagenes, alojamientoServicios, servicios]);

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
    <main className='alojamiento'>
      <div className='chapa'></div>
      <section className='contenido'>
        <a href='#' onClick={() => history.push('/buscar')} className='volver'>
          <ArrowBack></ArrowBack>Volver
        </a>
        {alojamientoJoined.done ? (
          <>
            <h1>
              {alojamientoJoined.Titulo}{' '}
              <sup
                className={`estado  ${
                  alojamientoJoined.Estado === 'Reservado'
                    ? 'reservado'
                    : 'disponible'
                }`}
              >
                {alojamientoJoined.Estado}
              </sup>
            </h1>

            <div className='lugar separador'>
              {alojamientoJoined.Imagenes.length > 0 ? (
                <>
                  <img
                    className='foto-principal'
                    src={alojImgsRoute + imagenPrincipal}
                  />
                  {alojamientoJoined.Imagenes.length > 1 && (
                    <div className='fotos-container'>
                      <Carrusel>
                        {imagenesCarrusel.map((porcion, index) => {
                          return (
                            <div key={index} className='fotos'>
                              {porcion.map((img, idx) => {
                                return (
                                  <img
                                    key={idx}
                                    src={alojImgsRoute + img.RutaArchivo}
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
              ) : (
                <img
                  className='foto-principal'
                  src={alojImgsRoute + 'img_not_found.png'}
                  alt='Sin imagen'
                />
              )}
            </div>
            <div className='detalles-alojamiento separador'>
              <div className='descripcion-alojamiento '>
                <h2>{alojamientoJoined.TipoAlojamiento}</h2>
                <p>
                  Dormitorios: {alojamientoJoined.CantidadDormitorios} | Baños:{' '}
                  {alojamientoJoined.CantidadBanios} | Precio por día:{' $'}
                  {alojamientoJoined.PrecioPorDia}
                </p>
                <div className='especificaciones-alojamiento'>
                  <Servicios
                    serviciosData={alojamientoJoined.Servicios}
                  ></Servicios>
                  <ul>
                    {alojamientoJoined.Descripcion &&
                    alojamientoJoined.Descripcion.trim() !== '' ? (
                      <>
                        <h4>
                          <strong>Descripción:</strong>
                        </h4>
                        <li>
                          <p>{alojamientoJoined.Descripcion}</p>
                        </li>
                      </>
                    ) : (
                      <em>Este alojamiento no cuenta con descripción</em>
                    )}
                  </ul>
                </div>
              </div>
              <div className='contenedor-mapa'>
                <h2>Ubicación </h2>
                <MapComponent alojamiento={alojamientoJoined} />
              </div>
            </div>
          </>
        ) : (
          'Cargando'
        )}{' '}
      </section>
    </main>
  );
};

export default Alojamiento;
