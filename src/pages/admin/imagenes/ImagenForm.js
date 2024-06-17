import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import styles from './admin-images.module.css';
const ImagenForm = () => {
  const { formContainer, btnWrapper } = styles;
  const [image, setImage] = useState(null);

  useEffect(() => {}, []);
  const handleInput = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <section className={`${formContainer}`}>
      <form>
        <div className='form-control'>
          <label>Seleccionar Imagen</label>
          <input type='file' onInput={handleInput} />
        </div>
        <div className={`${btnWrapper}`}>
          <button className='btn btn-add'>guardar</button>
          <button type='reset' className='btn btn-delete'>
            borrar
          </button>
          <button type='reset' className='btn btn-update'>
            cancelar
          </button>
        </div>
      </form>
      <div>
        <img
          src={`/images/tipo_alojamientos_pics/${
            image?.name || 'broken-image.png'
          }  `}
          alt=''
        />
      </div>
    </section>
  );
};

export default ImagenForm;
