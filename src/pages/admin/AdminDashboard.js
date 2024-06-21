import React from 'react';
import {
  Link,
  NavLink,
  useHistory,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min';

const AdminDashboard = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  return (
    <aside>
      {' '}
      <div>
        <ul
          style={{
            display: 'flex',

            justifyContent: 'center',
            alignItems: 'center',
            gap: ' 1rem',
          }}
        >
          <li>
            <Link
              style={{
                borderRadius: '20px',
                padding: '10px 15px',
                backgroundColor: 'var(--pink)',
                boxShadow: 'var(--box-shadow)',
                cursor: 'pointer',
              }}
              to='/'
            >
              inicio
            </Link>
          </li>
          <li>
            <NavLink
              to={`${path}/tipo-alojamientos`}
              activeStyle={{
                outline: ' 2px solid var(--pink)',
                outlineOffset: '4px',
              }}
            >
              tipo de alojamientos
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/imagenes`}
              activeStyle={{
                outline: ' 2px solid var(--pink)',
                outlineOffset: '4px',
              }}
            >
              imagenes
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${path}/servicios`}
              activeStyle={{
                outline: ' 2px solid var(--pink)',
                outlineOffset: '4px',
              }}
            >
              servicios
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminDashboard;
