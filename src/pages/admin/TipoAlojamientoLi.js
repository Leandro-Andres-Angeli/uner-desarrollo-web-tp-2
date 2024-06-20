import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const TipoAlojamientoLi = ({ id, desc }) => {
  const { path } = useRouteMatch();

  return (
    <li className='adminEntityLink'>
      <Link
        to={{
          pathname: `${path}/${id}`,
          state: {
            el: { id, desc },
          },
        }}
      >
        {' '}
        Tipo de alojamiento :<strong>{desc}</strong>{' '}
      </Link>
    </li>
  );
};

export default TipoAlojamientoLi;
