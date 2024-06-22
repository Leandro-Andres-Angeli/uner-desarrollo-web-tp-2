import React, { useContext, useEffect, useState } from 'react';

import { crudAlojamientosEndpoints, crudImagenes } from '../../../dbEndpoints';
import handleCRUD from '../../../utils/handleCrud';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EntitiesList from './../EntitiesList';
import notify from '../../../utils/toastNotify';
import ImagenesLi from '../ImagenesLi';
import ImagenForm from './imagenFormComponents/ImagenForm';
import intialState from '../../../utils/initialState';
import imgValidate from '../../../utils/imgValidate';
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min';
import Imagen from './Imagen';
import ImagenesProvider, {
  ImagenesContext,
  handleSubmit,
} from './ImagenesProvider';

export const Imagenes = () => {
  const [errors, setErrors] = useState({ error: 'empty' });
  const [imagePreview, setImagePreview] = useState({
    route: 'broken-image.png',
  });
  const [alojamientos, setAlojamientos] = useState(intialState);
  const { imagenesState } = useContext(ImagenesContext);
  const [imagenes, setImagenes] = imagenesState;
  useEffect(() => {
    setImagenes((prev) => ({ ...prev, update: false }));
    Promise.all([
      handleCRUD(crudAlojamientosEndpoints.readAll, undefined, setAlojamientos),
      handleCRUD(crudImagenes.readAll, undefined, setImagenes),
    ])
      .then((data) => {
        console.log(data[0]);
        return data;
      })

      .catch((err) => notify(err.message || 'error cargando data'));
    console.log('render');
  }, [imagenes.update]);

  const handleInputCapture = ({ target }) => {
    const [file] = target?.files;
    // console.log(file);
    const { type } = file;
    if (!imgValidate(type)) {
      setErrors({ error: 'debe cargar archivos de tipo imagen' });
      notify('debe cargar archivos de tipo imagen');
      return;
    }
    console.log(file.name);
    setImagePreview({
      type,
      route: `${file.name}`,
    });
    setErrors({});
  };
  return (
    <section style={{ paddingTop: 'var(--pad-x)' }}>
      <ImagenForm
        {...{
          setErrors,
          setImagePreview,
          imagePreview,

          handleInputCapture,
          alojamientos,
          errors,
        }}
      ></ImagenForm>
      {/* REFACTORED INTO COMPONENT */}
      {/*      <form
          onReset={() => {
            setErrors({ error: 'empty' });
            setImagePreview(null);
          }}
          onSubmit={handleSubmit}
          style={{ flexGrow: 1 }}
        >
          <h2> Imagenes </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingBottom: '2rem ',
            }}
          >
            <label style={{ width: 'auto' }}> Seleccionar imagen:</label>
            <input
              accept='.jpg , .jpeg , .webp , .png'
              name='file'
              type='file'
              style={{ margin: 0, padding: 0 }}
              onInputCapture={handleInputCapture}
            />
          </div>

          <div className='form-control'>
            <label>vincular a alojamiento</label>
            <select name='idAlojamiento'>
              {alojamientos &&
                alojamientos?.data?.map((el) => {
                  console.log(el);
                  return (
                    <option value={el.idAlojamiento} key={el.idAlojamiento}>
                      {el.Titulo}
                    </option>
                  );
                })}
            </select>
          </div>
          <button
            type='submit'
            style={{
              borderRadius: '20px',
              padding: '10px 15px',
              backgroundColor: `${
                Boolean(Object.keys(errors).length === 0)
                  ? 'var(--primary-color)'
                  : 'gray'
              }`,
              boxShadow: 'var(--box-shadow)',
              cursor: 'pointer',
            }}
            // disabled={String(Boolean(Object.keys(errors).length !== 0))}
            disabled={!Boolean(Object.keys(errors).length === 0)}
          >
            enviar
          </button>
          <button className='btn btn-delete' type='reset'>
            cancelar
          </button>
        </form> */}
      {/* REFACTORED INTO COMPONENT */}

      <EntitiesList list={imagenes}>
        <ul>
          {imagenes?.data.map((el) => {
            // console.log('img', el);
            const { idImagen, idAlojamiento, RutaArchivo } = el;
            return (
              <ImagenesLi
                key={idImagen}
                id={idImagen}
                idAloj={idAlojamiento}
                route={RutaArchivo}
              ></ImagenesLi>
            );
          })}
        </ul>
      </EntitiesList>
    </section>
  );
};

const ImagenesRoute = () => {
  const { path } = useRouteMatch();
  const [imagenes, setImagenes] = useState(intialState);
  return (
    <ImagenesContext.Provider
      value={{ imagenesState: [imagenes, setImagenes], handleSubmit }}
    >
      <Switch>
        <Route exact path={path}>
          <Imagenes></Imagenes>
        </Route>
        <Route path={`${path}/:id`}>
          <Imagen></Imagen>
        </Route>
      </Switch>
      <ToastContainer />
    </ImagenesContext.Provider>
  );
};
export default ImagenesRoute;
