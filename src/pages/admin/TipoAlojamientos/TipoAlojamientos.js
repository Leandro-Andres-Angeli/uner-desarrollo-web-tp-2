import React, { useEffect, useState } from 'react';
import {
  BaseURL,
  getAllTiposDeAlojamiento,
  tiposDeAlojamiento,
} from '../../../dbEndpoints';
import ErrorMsg from '../../../components/ErrorMsg';
import {
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min';
import TipoAlojamientosForm from '../tipoAlojamientosForm/TipoAlojamientosForm';
import { SpinnerCircular } from 'spinners-react';

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
      {/* <button className='btn btn-edit'>
          <ion-icon name='trash-outline'></ion-icon>
        </button>
        <button
          className='btn btn-delete'
          onClick={handleDelete}
          data-id={el.idTipoAlojamiento}
        >
          <ion-icon name='pencil-outline'></ion-icon>
        </button> */}
    </Link>
  );
};
const TipoAlojamientosLinks = ({ list }) => {
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
  const [tipoAlojamientosState, setTipoAlojamientosState] = useState({
    data: [],
    loading: true,
    done: false,
    error: null,
  });

  useEffect(() => {
    // console.log('render');
    const getTiposDeAloj = async () => {
      try {
        const res = await fetch(
          `${BaseURL}${tiposDeAlojamiento}${getAllTiposDeAlojamiento}`
        );
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          return;
        }
        setTipoAlojamientosState((prev) => ({
          ...prev,
          data,
          error: false,
        }));
      } catch (err) {
        const { status } = err;

        setTipoAlojamientosState((prev) => ({
          ...prev,
          error: true,

          status,
        }));
      } finally {
        setTipoAlojamientosState((prev) => ({
          ...prev,
          done: true,
          loading: false,
        }));
      }
    };

    getTiposDeAloj();
  }, []);
  const { error, data, loading } = tipoAlojamientosState;
  return (
    <section style={{ paddingTop: ' var(--pad-x)' }}>
      <TipoAlojamientosForm
        type={'add'}
        actions={[{ actionType: 'add', text: 'agregar' }]}
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
