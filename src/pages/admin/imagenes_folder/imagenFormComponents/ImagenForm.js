import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useLocation,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { handleLinkToEntityImages } from '../../../../utils/linkToEntities';
import alojImgsRoute from '../../../../utils/publicImagesAlojRoutes';
import { useMemo } from 'react';
import { render } from '@testing-library/react';
import { crudImagenes } from '../../../../dbEndpoints';
import { ImagenesContext } from '../Imagenes';

const ImagenForm = ({
  setErrors,
  setImagePreview,
  imagePreview,
  handleSubmit,
  handleInputCapture,
  alojamientos,
  errors,
}) => {
  const location = useLocation();
  const [linkSelection, setLinkSelection] = useState(null);
  const { id } = useParams();
  const ref = useRef(handleLinkToEntityImages(location.state || null));
  /* const handleImagePreview = () => {
    if (location.state?.el) {
      setImagePreview({ route: location.state.el.route });
    }
  }; */

  const locationState = Boolean(location?.state)
    ? location.state.el.route
    : null;
  const previewImgRef = useRef(imagePreview);
  useEffect(() => {
    setLinkSelection({
      options: ref.current.toSorted().toReversed(),
      selected: ref.current.toSorted().toReversed()[0],
    });
    if (locationState) {
      console.log('edit');
      // setImagePreview({ route: locationState });
      previewImgRef.current = { route: locationState };
    }
    console.log('render');
    return () => setImagePreview(previewImgRef.current);
  }, [locationState, setImagePreview]);

  return (
    <div
      style={{
        display: 'flex',
        boxShadow: 'var(--box-shadow)',
        padding: '1rem',
        borderRadius: '10px',
      }}
    >
      <form
        onReset={() => {
          setErrors({ error: 'empty' });
          setImagePreview({ route: 'broken-image.png' });
        }}
        onSubmit={handleSubmit}
        style={{ flexGrow: 1 }}
        data-action={location.state ? 'PUT' : 'POST'}
        data-route={
          location.state ? `${crudImagenes.PUT}${id}` : crudImagenes.POST
        }
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
          <label>Gestion de relacion con alojamientos</label>
          <select
            onChange={(ev) =>
              setLinkSelection(function (prev) {
                return {
                  ...prev,
                  selected: prev.options[ev.target.selectedIndex],
                };
              })
            }
          >
            {linkSelection &&
              linkSelection.options.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
          </select>
        </div>
        {linkSelection && linkSelection.selected === 'vincular' && (
          <div className='form-control'>
            <label>vincular a alojamiento</label>
            <select name='idAlojamiento'>
              {alojamientos &&
                alojamientos.data.map((el) => {
                  return (
                    <option value={el.idAlojamiento} key={el.idAlojamiento}>
                      {el.Titulo}
                    </option>
                  );
                })}
            </select>
          </div>
        )}

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
      </form>

      <div style={{ flex: 1 }}>
        <img
          style={{
            maxWidth: '30vw',
            boxShadow: 'var(--box-shadow)',
            borderRadius: '10px',
          }}
          src={`${alojImgsRoute}${imagePreview?.route}`}
          alt=''
        />
      </div>
    </div>
  );
};

export default ImagenForm;
