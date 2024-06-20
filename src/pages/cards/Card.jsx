import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';
import Carrusel from '../../components/carrusel/Carrusel';

const Card = ({ item }) => {
  return (
    <div className='tarjeta-alojamiento'>
      <div>
        {item.Imagenes.length > 0 ? (
          <Carrusel arrowSize={10}>
            {item.Imagenes.map((imagen) => {
              console.log(imagen);
              return (
                <img
                  src={`./images/tipo_alojamientos_pics/${imagen.RutaArchivo}`}
                  alt=''
                />
              );
            })}
          </Carrusel>
        ) : (
          <img src='./images/tipo_alojamientos_pics/broken-image.png' alt='' />
        )}
      </div>
      <Link to={`/alojamiento/${item.idAlojamiento}`}>
        <div className='tarjeta-descripcion'>
          <h3>
            <strong>
              {item.desc} en {item.Titulo}
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
