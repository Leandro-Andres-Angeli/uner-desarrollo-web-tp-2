import React, { useEffect, useState } from 'react';
import {
  BaseURL,
  getAllTiposDeAlojamiento,
  tiposDeAlojamiento,
} from '../../dbEndpoints';
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min';
import TipoAlojamientos from './TipoAlojamientos/TipoAlojamientos';
import { Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import adminModule from './admin.module.css';

const Admin = () => {
  const { adminPanel, btnAdd } = adminModule;
  let { url } = useRouteMatch();

  return (
    <main className='main'>
      <h1>Administracion</h1>

      <section className={`${adminPanel}`}>
        <AdminDashboard></AdminDashboard>
      </section>

      <Switch>
        <Route path={`${url}/tipo-alojamientos`}>
          <TipoAlojamientos></TipoAlojamientos>
        </Route>
      </Switch>
      <button className={`${btnAdd}`}>+</button>
    </main>
  );
};

export default Admin;
