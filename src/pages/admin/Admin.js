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
import TipoAlojamiento from './TipoAlojamiento/TipoAlojamiento';

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
        <Route exact path={`${url}/tipo-alojamientos`}>
          <>
            <TipoAlojamientos></TipoAlojamientos>
          </>
        </Route>
        <Route path={`${url}/tipo-alojamientos/:id`}>
          <TipoAlojamiento></TipoAlojamiento>
        </Route>
      </Switch>
    </main>
  );
};

export default Admin;
