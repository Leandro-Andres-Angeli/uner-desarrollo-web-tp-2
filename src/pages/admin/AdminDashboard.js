import React from 'react';
import {
  Link,
  NavLink,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min';
import adminStyle from './admin.module.css';
const AdminDashboard = () => {
  const { path } = useRouteMatch();
  const { adminNavbar, activeLink } = adminStyle;

  return (
    <nav className={`${adminNavbar}`}>
      <ul>
        <li>
          <NavLink to={`/`}>home</NavLink>
        </li>
        <li>
          <NavLink
            to={`${path}/alojamientos`}
            activeClassName={`${activeLink}`}
          >
            alojamientos
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${path}/tipo-alojamientos`}
            activeClassName={`${activeLink}`}
          >
            tipo de alojamientos
          </NavLink>
        </li>
        <li>
          <NavLink to={`${path}/imagenes`} activeClassName={`${activeLink}`}>
            imagenes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminDashboard;
