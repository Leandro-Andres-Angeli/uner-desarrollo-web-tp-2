import React, { useState, useEffect } from 'react';
import CardList from '../cards/CardList';
import './BuscadorAlojamiento.css';
import LoadingIcon from '../../components/LoadingIcon.js';

const BuscadorAlojamiento = ({ titulo, alojamientos }) => {
  return (
    <div className='buscador'>
      <section className='centrado contenido'>
        {alojamientos.loading ? (
          <LoadingIcon></LoadingIcon>
        ) : alojamientos.data.length > 0 ? (
          <CardList
            lista={alojamientos.data}
            titulo={titulo || 'Resultados de tu búsqueda'}
          ></CardList>
        ) : (
          'No se encontraron alojamientos con esas características'
        )}
      </section>
    </div>
  );
};

export default BuscadorAlojamiento;
