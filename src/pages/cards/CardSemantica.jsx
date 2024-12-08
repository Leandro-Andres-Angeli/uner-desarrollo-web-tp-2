import React from 'react';
import { Link } from 'react-router-dom';
// import './Cards.css';

const CardSemantica = ({ item }) => {
  return (
    <Link to={`/alojamiento/${item.idAlojamiento}`}>
      <div
        className='tarjeta'
        style={{
          padding: '1rem',
          border: '1px solid white',
          borderRadius: '10px',
        }}
      >
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
                : 'images/tipo_alojamientos_pics/img_not_found.png'
            }
            alt=''
          />
        </div>
        <div className='tarjeta-descripcion'>
          <h3
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              maxWidth: '90%',
              width: '100%',
            }}
          >
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
          <ul>
            <li>Etado : {item.Estado}</li>
            <li>Dormitorios: {item.CantidadDormitorios}</li>
            <li>Baños: {item.CantidadBanios}</li>
            <li>
              <strong>
                {Intl.NumberFormat('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                }).format(item.PrecioPorDia)}{' '}
              </strong>
              noche
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default CardSemantica;
