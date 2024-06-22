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

import AlojamientosDashboard from './alojamientos/AlojamientosDashboard';
import ImagenesRoute from './imagenes_folder/Imagenes';

// import Imagen from './imagenes_folder/Imagen';
import ServiciosDashboard from './servicios/ServiciosDashboard';

const Admin = () => {
  const { adminPanel } = adminModule;
  let { url, path } = useRouteMatch();

  return (
    <main className='main'>
      <h1>Administracion</h1>
      <section className={`${adminPanel}`}>
        <AdminDashboard></AdminDashboard>
      </section>

      <Switch>
        <Route exact path={`${url}/tipo-alojamientos`}>
          <TipoAlojamientos></TipoAlojamientos>
        </Route>

        <Route path={`${url}/tipo-alojamientos/:id`}>
          <TipoAlojamiento></TipoAlojamiento>
        </Route>
        <Route path={`${url}/alojamientos`}>
          <AlojamientosDashboard></AlojamientosDashboard>
        </Route>

        <Route path={`${path}/imagenes`}>
          <ImagenesRoute></ImagenesRoute>
        </Route>

        <Route path={`${path}/servicios`}>
          <ServiciosDashboard></ServiciosDashboard>
        </Route>
      </Switch>
    </main>
  );
};

export default Admin;
