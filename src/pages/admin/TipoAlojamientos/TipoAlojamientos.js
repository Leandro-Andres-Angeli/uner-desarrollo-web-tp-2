import React, { useEffect, useMemo, useState } from 'react';
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
import UseCrud from '../../../hooks/UseCrud';

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
  // const [tipoAlojamientosState, setTipoAlojamientosState] = useState({
  //   data: [],
  //   loading: true,
  //   done: false,
  //   error: null,
  // });
  const [d, setD] = useState(null);

  // const [crud, setCrud] = UseCrud(
  //   'https://jsonplaceholder.typicode.com/posts',
  //   'GET'
  // );
  // const [p, setP] = UseCrud(
  //   'https://jsonplaceholder.typicode.com/posts',
  //   'POST',
  //   {
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1,
  //   }
  // );
  const [tipoAlojamientosState, setTipoAlojamientosState] = UseCrud(
    'http://localhost:3001/tiposAlojamiento/getTiposAlojamiento',
    'GET'
  );
  // useEffect(() => {
  //   console.log('render');
  // }, []);

  /* useEffect(() => {
    // console.log('render');

    Funcion refactorizada en class apiCrud
    
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
  }, []); */
  const { error, data, loading } = tipoAlojamientosState;
  return (
    <section style={{ paddingTop: ' var(--pad-x)' }}>
      <TipoAlojamientosForm
        type={'add'}
        actions={[{ actionType: 'POST', text: 'agregar' }]}
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
