import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import alojImgsRoute from './../../utils/publicImagesAlojRoutes';

const ImagenesLi = ({ id, idAloj, route, handleSubmit }) => {
  const { path } = useRouteMatch();
  // console.log(id);
  return (
    <li className='adminEntityLink'>
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
          }}
        >
          <div className='img-container'>
            <img src={`${alojImgsRoute}${route}`} alt=''></img>
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
