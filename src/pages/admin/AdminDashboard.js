import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const AdminDashboard = () => {
  const { path } = useRouteMatch();
  return (
    <aside>
      {' '}
      <div>
        <ul>
          <li>
            <Link to={`${path}/tipo-alojamientos`}>tipo de alojamientos</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminDashboard;
