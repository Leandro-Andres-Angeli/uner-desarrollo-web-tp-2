import React from 'react';
import { SiteIcon } from '../icons/SiteIcon';
import Opinion from './opinion/Opinion';
import { listaOpiniones } from './opinion/listaOpiniones';
import Carrusel from './carrusel/Carrusel';
import { useHistory } from 'react-router-dom';
import PaginaBuscador from '../pages/buscador/PaginaBuscador';

const HomeMain = () => {
  const history = useHistory();
  const intialState = {
    data: [],
    loading: true,
    done: false,
    error: null,
    update: false,
  };
  const [alojamientos, setAlojamientos] = useState(intialState);
  const [imgs, setImgs] = useState(intialState);
  const [tipoAlojamientos, setTipoAlojamientos] = useState(intialState);
  const [joined, setJoinedData] = useState({ data: [] });

  useEffect(() => {
    return async () => {
      // await handleCRUD(
      //   crudAlojamientosEndpoints.readAll,
      //   undefined,
      //   setAlojamientos
      // );
      await Promise.all([
        handleCRUD(
          crudAlojamientosEndpoints.readAll,
          undefined,
          setAlojamientos
        ),
        handleCRUD(crudImagenes.readAll, undefined, setImgs),
        handleCRUD(
          crudTipoAlojamientosEndpoints.readAll,
          undefined,
          setTipoAlojamientos
        ),
      ])
        .then(([alojamientos, pics, tipos]) => {
          console.log(tipos);
          setJoinedData((prev) => {
            return {
              ...prev,
              data: alojamientos.map((el) => ({
                ...el,
                desc: tipos.filter(
                  (aloj) => aloj.idTipoAlojamiento === el.TipoAlojamiento
                )[0].Descripcion,
                pictures: pics.filter(
                  (pic) => pic.idAlojamiento === el.idAlojamiento
                ),
              })),
            };
          });
        })
        .catch((err) => console.log(err));
    };
  }, []);
  const { data: dataAlojamientos } = alojamientos;
  const { data: dataImgs } = imgs;

  return (
    <main className='main main-index'>
      <div className='chapa'></div>
      <section className='contenido'>
        {/* {JSON.stringify(dataImgs)}
        {JSON.stringify(dataAlojamientos)} */}
        {JSON.stringify(joined)}
        <h1>Tu lugar en el mundo</h1>
        <p>
          Encontrá en un solo sitio el lugar perfecto para descansar y
          reconectar con vos mismo.
        </p>
        <p>Podrás elegir el alojamiento que se adapte a tus necesidades.</p>
        <p>Estas a un click de distancia de ese lugar de ensueño</p>
        <button
          onClick={() => history.push('/buscar')}
          className='icon-btn btn-index'
        >
          <SiteIcon className={'nav-logo-icon'}></SiteIcon>
          Buscar Alojamiento
        </button>
      </section>
      <section className='sobre-chapa'>
        <PaginaBuscador
          estado='Disponible'
          mostrarFiltro={false}
          cantidad={4}
          titulo='Recomendados'
        ></PaginaBuscador>
      </section>
      <section className='sobre-chapa'>
        <h2>{'Lo que dicen nuestros clientes'}</h2>

        <Carrusel>
          {listaOpiniones.map((opinion, index) => {
            return <Opinion key={index} opinion={opinion} />;
          })}
        </Carrusel>
      </section>
    </main>
  );
};

export default HomeMain;
