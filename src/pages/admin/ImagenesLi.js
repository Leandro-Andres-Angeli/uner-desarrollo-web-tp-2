import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const ImagenesLi = ({ id, idAloj, route }) => {
  const { path } = useRouteMatch();
  console.log(id);
  return (
    <li className='ImagenesLink'>
      <Link
        to={{
          pathname: `${path}/${id}`,
          state: {
            el: { id, idAloj, route },
          },
        }}
      >
        {' '}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '20% auto',
            padding: '1rem',
            boxShadow: 'var(--box-shadow)',
            margin: '1rem 0',
          }}
        >
          <div className='img-container'>
            <img src={`${route}`} alt=''></img>
          </div>
          <div style={{ padding: '1rem', lineHeight: ' 1.5rem' }}>
            <ul>
              <li>
                ruta : <strong>{route}</strong>{' '}
              </li>
              <li>
                {' '}
                id : <strong> {id}</strong>
              </li>
            </ul>{' '}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ImagenesLi;
