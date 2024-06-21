import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { handleLinkToEntityImages } from '../../../../utils/linkToEntities';
import alojImgsRoute from '../../../../utils/publicImagesAlojRoutes';

import { crudImagenes } from '../../../../dbEndpoints';
import { ImagenesContext } from '../ImagenesProvider';
import ButtonsWrapper, {
  AdminFormBtn,
} from './../../admin_shared/ButtonsWrapper';
import { imgsNew, imgsUpdate } from '../../admin_shared/btnActions';

const ImagenForm = ({
  setErrors,
  setImagePreview,
  imagePreview,

  handleInputCapture,
  alojamientos,
  errors,
}) => {
  const location = useLocation();
  const [linkSelection, setLinkSelection] = useState(null);

  const ref = useRef(handleLinkToEntityImages(location.state || null));
  const history = useHistory();
  /* const handleImagePreview = () => {
    if (location.state?.el) {
      setImagePreview({ route: location.state.el.route });
    }
  }; */
  const {
    handleSubmit,
    imagenesState: [_, setImagenes = {}],
  } = useContext(ImagenesContext);
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
      // console.log('edit');
      // setImagePreview({ route: locationState });
      previewImgRef.current = { route: locationState };
    }

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
      {JSON.stringify(location.state?.el?.id ?? null)}
      <form
        onReset={() => {
          setErrors({ error: 'empty' });
          setImagePreview({ route: 'broken-image.png' });
        }}
        onSubmit={async function (e) {
          // console.log('submit res');
          await handleSubmit(e, setImagenes);

          if (Boolean(location.state)) {
            return history.push('/admin/imagenes');
          }
        }}
        style={{ flexGrow: 1 }}
        data-action-type={location.state ? 'UPDATE' : 'ADD'}
        data-id={location.state?.el?.id ?? null}
        // data-route={
        //   location.state ? `${crudImagenes.PUT}${id}` : crudImagenes.POST
        // }
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
        <ButtonsWrapper>
          {locationState
            ? imgsUpdate.map(({ actionType, text, stylesClassName }) => (
                <AdminFormBtn
                  key={actionType}
                  {...{ actionType, text, stylesClassName }}
                ></AdminFormBtn>
              ))
            : imgsNew.map(({ actionType, text, stylesClassName, type }) => (
                <AdminFormBtn
                  key={actionType}
                  {...{ actionType, text, stylesClassName, type }}
                ></AdminFormBtn>
              ))}
        </ButtonsWrapper>
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
