import React, { useEffect, useState } from 'react';
import { crudTipoAlojamientosEndpoints } from '../../../dbEndpoints';
import ErrorMsg from '../../../components/ErrorMsg';
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import TipoAlojamientosForm from '../tipoAlojamientosForm/TipoAlojamientosForm';

import handleCRUD from '../../../utils/handleCrud';

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
    // console.log('render list');
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
    return async () => {
      await handleCRUD(
        crudTipoAlojamientosEndpoints.readAll,
        undefined,
        setTipoAlojamientos
      );
    };
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

      {loading ? <span>Cargando</span> : <></>}
      {!error ? (
        <TipoAlojamientosLinks list={data}></TipoAlojamientosLinks>
      ) : (
        <ErrorMsg></ErrorMsg>
      )}
    </section>
  );
};

export default TipoAlojamientos;
