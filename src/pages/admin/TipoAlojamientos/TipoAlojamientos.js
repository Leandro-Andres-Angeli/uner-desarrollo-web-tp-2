import React, { useEffect, useState } from 'react';
import { crudTipoAlojamientosEndpoints } from '../../../dbEndpoints';
import ErrorMsg from '../../../components/ErrorMsg';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import TipoAlojamientosForm from '../tipoAlojamientosForm/TipoAlojamientosForm';

import handleCRUD from '../../../utils/handleCrud';
import EntitiesList from './../EntitiesList';
import callApi from '../../../utils/callApi';

const TipoAlojamientoLink = ({ el }) => {
  const { path } = useRouteMatch();

  return (
    <Link
      to={{
        pathname: `${path}/${el.idTipoAlojamiento}`,
        state: {
          el,
        },
      }}
    >
      {' '}
      Tipo de alojamiento :<strong>{el.Descripcion}</strong>{' '}
    </Link>
  );
};
const TipoAlojamientosLinks = ({ list }) => {
  useEffect(() => {
    return () => {};
  }, [list]);

  return (
    <>
      <h2>Listado : Tipos de Alojamientos</h2>

      <ul>
        {list &&
          list.map((el) => (
            <li key={el.idTipoAlojamiento} className='tipoAlojamientoLink'>
              <TipoAlojamientoLink {...{ el }}></TipoAlojamientoLink>
            </li>
          ))}
      </ul>
    </>
  );
};

const TipoAlojamientos = () => {
  const intialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
    update: false,
  };
  const [tipoAlojamientos, setTipoAlojamientos] = useState(intialState);

  useEffect(() => {
    setTipoAlojamientos((prev) => ({ ...prev, update: false }));
    // console.log('render done');

    callApi(
      crudTipoAlojamientosEndpoints.readAll,

      setTipoAlojamientos
    );
  }, [tipoAlojamientos.update]);

  const { error, data, loading } = tipoAlojamientos;
  console.log(data);
  return (
    <section style={{ paddingTop: ' var(--pad-x)' }}>
      <TipoAlojamientosForm
        type={'add'}
        actions={[
          {
            actionType: 'POST',
            text: 'agregar',
            stylesClassName: 'add',
            endpoint: 'create',
          },
        ]}
        {...{ setTipoAlojamientos }}
      ></TipoAlojamientosForm>
      {/* refactorizando para evitar ifs  y abstrayendo */}
      {/* 
      {loading ? <span>Cargando</span> : <></>}
      {!error ? (
        <TipoAlojamientosLinks list={data}></TipoAlojamientosLinks>
      ) : (
        <ErrorMsg></ErrorMsg>
      )} */}
      <EntitiesList {...{ error, data, loading }} list={data}></EntitiesList>
    </section>
  );
};

export default TipoAlojamientos;
