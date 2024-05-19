import React from 'react';
import { SiteIcon } from '../icons/SiteIcon';
import CardList from '../pages/cards/CardList';
import Opinion from "./opinion/Opinion";
import { listaOpiniones } from "./opinion/listaOpiniones";
import Carrusel from "./carrusel/Carrusel";

const HomeMain = () => {
  return (
    <main className='main main-index'>
      <div className='chapa'></div>
      <section className='contenido'>
        <h1>Tu lugar en el mundo</h1>
        <p>
          Encontrá en un solo sitio el lugar perfecto para descansar y
          reconectar con vos mismo. Podrás elegir el alojamiento que se adapte a
          tus necesidades Estas a un click de distancia de ese lugar de ensueño
        </p>
        <button className='icon-btn btn-index'>
          <SiteIcon className={'nav-logo-icon'}></SiteIcon>
          Alojar Terciario
        </button>
      </section>
      <section className="sobre-chapa">
        <CardList titulo="Recomendados" />
      </section>
      <section className="sobre-chapa">
        <h2>{"Lo que dicen nuestros clientes"}</h2>

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
