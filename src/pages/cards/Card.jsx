import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

const Card = ({ item }) => {
  return (
    <div className='tarjeta-alojamiento'>
      <Link to={`/alojamiento/${item.idAlojamiento}`}>
        <div>
          <img
            // src="images/img7.png"
            // src={` images/tipo_alojamientos_pics/hotel${
            //   item.pictures[0]?.rutaArchivo}` ?? ''
            // }
            src={
              item.pictures.length > 0
                ? 'images/tipo_alojamientos_pics/hotel_' +
                  item.pictures[0].RutaArchivo +
                  '.jpg'
                : 'images/tipo_alojamientos_pics/hostal.jpg'
            }
            alt=''
          />
        </div>
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
            <strong>{item.PrecioPorDia} </strong>noche
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
