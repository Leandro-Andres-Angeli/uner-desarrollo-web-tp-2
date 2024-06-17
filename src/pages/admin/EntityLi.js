import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const EntityLi = ({ el, children }) => {
  const { path } = useRouteMatch();

  return (
    <li className='tipoAlojamientoLink'>
      <Link
        to={{
          pathname: `${path}/${el.idTipoAlojamiento}`,
          state: {
            el,
          },
        }}
      >
        {' '}
        {/* {children} */}
        Tipo de alojamiento :<strong>{el.Descripcion}</strong>{' '}
      </Link>
    </li>
  );
};

export default EntityLi;
