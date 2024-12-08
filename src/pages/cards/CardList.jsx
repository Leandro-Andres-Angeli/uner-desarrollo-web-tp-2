import React from 'react';
import Card from './Card';
import './Cards.css';

const CardList = ({ titulo = '', lista }) => {
  return (
    <div className='card-list'>
      <h2 className='centrado'>{titulo}</h2>
      <div className='tarjetas'>
        {lista &&
          lista.map((item, index) => {
            return <Card key={index} item={item}></Card>;
          })}
      </div>
    </div>
  );
};

export default CardList;
