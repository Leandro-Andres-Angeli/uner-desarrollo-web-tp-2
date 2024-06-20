import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { handleLinkToEntityImages } from '../../../../utils/linkToEntities';

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

  const ref = useRef(handleLinkToEntityImages(location.state || null));

  useEffect(() => {
    setLinkSelection({
      options: ref.current.toSorted().toReversed(),
      selected: ref.current.toSorted().toReversed()[0],
    });
  }, []);

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
          src={
            imagePreview?.route ||
            location?.state?.el?.route ||
            '/images/tipo_alojamientos_pics/broken-image.png'
          }
          alt=''
        />
      </div>
    </div>
  );
};

export default ImagenForm;
