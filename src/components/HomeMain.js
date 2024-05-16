import React from 'react';
import { SiteIcon } from '../icons/SiteIcon';

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
    </main>
  );
};

export default HomeMain;
