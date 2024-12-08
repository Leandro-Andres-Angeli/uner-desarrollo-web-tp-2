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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: value,
    });
  };

  const resetFormulario = () => {
    setDatosFormulario({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    });
  };

  return (
    <div className="pagina-contacto">
      <Formulario
        datosFormulario={datosFormulario}
        setDatosFormulario={setDatosFormulario}
        onChange={handleChange}
        onReset={resetFormulario}
      />
      <DatosUsuario datos={datosFormulario} />
    </div>
  );
};

export default Contact;
