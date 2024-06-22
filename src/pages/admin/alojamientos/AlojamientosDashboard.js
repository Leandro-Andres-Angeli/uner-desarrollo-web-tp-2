import React, { useEffect, useState } from 'react';
import AlojamientoForm from './AlojamientoForm';
import EntitiesList from './../EntitiesList';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { crudServiciosEndpoints } from '../../../dbEndpointsServicios';
import { crudAlojamientosEndpoints } from '../../../dbEndpointsAlojamiento';
import { crudTipoAlojamientosEndpoints } from '../../../dbEndpoints';
import handleCRUD from '../../../utils/handleCrud';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlojamientoLi = ({ alojamiento }) => {
  const { path } = useRouteMatch();

  return (
    <li className='adminEntityLink'>
      <Link
        to={{
          pathname: `${path}/${alojamiento.idAlojamiento}`,
          state: {
            el: alojamiento,
          },
        }}
      >
        {' '}
        Alojamiento :<strong>{alojamiento.Titulo} </strong>{' '}
      </Link>
    </li>
  );
};

const AlojamientosDashboard = () => {
  const intialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
    update: false,
  };
  const [servicios, setServicios] = useState(intialState);
  const [alojamientos, setAlojamientos] = useState(intialState);
  const [tipoAlojamientos, setTipoAlojamientos] = useState(intialState);
  const [editando, setEditando] = useState(false);

  const cargarInicial = async () => {
    await Promise.all([
      handleCRUD(crudAlojamientosEndpoints.readAll, undefined, setAlojamientos),
      handleCRUD(
        crudTipoAlojamientosEndpoints.readAll,
        undefined,
        setTipoAlojamientos
      ),
      handleCRUD(crudServiciosEndpoints.readAll, undefined, setServicios),
    ]);
  };

  useEffect(() => {
    cargarInicial();
  }, []);

  useEffect(() => {
    setAlojamientos((prev) => ({ ...prev, update: false }));
    if (alojamientos.update) {
      const getAlojamientos = async () => {
        await handleCRUD(
          crudAlojamientosEndpoints.readAll,
          undefined,
          setAlojamientos
        );
      };
      getAlojamientos();
    }
  }, [alojamientos.update]);

  return (
    <section style={{ paddingTop: ' var(--pad-x)' }}>
      <ToastContainer />

      <AlojamientoForm
        type={'PUT'}
        {...{ setAlojamientos }}
        tipoAlojamientos={tipoAlojamientos}
        servicios={servicios}
        setEditando={setEditando}
      ></AlojamientoForm>

      {!editando && (
        <EntitiesList
          error={alojamientos.error}
          loading={alojamientos.loading}
          list={alojamientos.data}
        >
          <ul>
            {alojamientos.data.map((el, index) => {
              return (
                <AlojamientoLi key={index} alojamiento={el}></AlojamientoLi>
              );
            })}
          </ul>
        </EntitiesList>
      )}
    </section>
  );
};

export default AlojamientosDashboard;
