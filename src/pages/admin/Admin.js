import React from 'react';

import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min';
import TipoAlojamientos from './TipoAlojamientos/TipoAlojamientos';

import AdminDashboard from './AdminDashboard';
import adminModule from './admin.module.css';
import TipoAlojamiento from './TipoAlojamiento/TipoAlojamiento';
import Imagenes from './imagenes_folder/Imagenes';
import AlojamientosDashboard from './alojamientos/AlojamientosDashboard';
import AlojamientoDashboard from './alojamiento/AlojamientoDashboard';
import Imagen from './imagenes_folder/Imagen';

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
        <Route exact path={`${url}/alojamientos`}>
          <AlojamientosDashboard></AlojamientosDashboard>
        </Route>
        <Route path={`${url}/alojamientos/:id`}>
          <AlojamientoDashboard></AlojamientoDashboard>
        </Route>
        <Route exact path={`${url}/imagenes`}>
          <Imagenes></Imagenes>
        </Route>
        <Route exact path={`${url}/imagenes/:id`}>
          <Imagen></Imagen>
        </Route>
      </Switch>
    </main>
  );
};

export default Admin;
