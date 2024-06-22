import React from 'react';
import { SiteIcon } from '../icons/SiteIcon';
import Opinion from './opinion/Opinion';
import { listaOpiniones } from './opinion/listaOpiniones';
import Carrusel from './carrusel/Carrusel';
import { useHistory } from 'react-router-dom';
import PaginaBuscador from '../pages/buscador/PaginaBuscador';

const HomeMain = () => {
  const history = useHistory();

  return (
    <main className='main main-index'>
      <div className='chapa'></div>
      <section className='centrado contenido'>
        <h1>Tu lugar en el mundo</h1>
        <p>
          Encontrá en un solo sitio el lugar perfecto para descansar y
          reconectar con vos mismo.
        </p>
        <p>Podrás elegir el alojamiento que se adapte a tus necesidades.</p>
        <p>Estas a un click de distancia de ese lugar de ensueño</p>
        <button
          onClick={() => history.push('/buscar')}
          className='centrado icon-btn btn-index'
        >
          <SiteIcon className={'nav-logo-icon'}></SiteIcon>
          Buscar Alojamiento
        </button>
      </section>
      <section className='sobre-chapa'>
        <PaginaBuscador
          estado='Disponible'
          mostrarFiltro={false}
          cantidad={4}
          titulo='Recomendados'
        ></PaginaBuscador>
      </section>
      <section className='centrado sobre-chapa'>
        <h2>{'Lo que dicen nuestros clientes'}</h2>
        <br />
        <Carrusel>
          {listaOpiniones.map((opinion, index) => {
            return <Opinion key={index} opinion={opinion} />;
          })}
        </Carrusel>
      </section>
    </main>
  );
};

export default HomeMain;
