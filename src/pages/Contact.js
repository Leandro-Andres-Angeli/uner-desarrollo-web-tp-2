import React, { useState } from 'react';
import './Contact.css';
import Formulario from '../components/Formulario';
import DatosUsuario from '../components/DatosUsuario';

const Contact = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const handleSubmit = (data) => {
    // console.log(data);
    setDatosFormulario(data);
  };

  return (
    <div>
      <Formulario onSubmit={handleSubmit} />
      <DatosUsuario datos={datosFormulario} />
    </div>
  );
};

export default Contact;
