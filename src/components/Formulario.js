import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = ({
  datosFormulario,
  setDatosFormulario,
  onChange,
  onReset,
}) => {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onReset();

    try {
      setEnviando(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('¡Mensaje enviado con éxito!', {
        position: 'top-right',
      });
      onReset();
    } catch (error) {
      console.error('Error en la simulación de envío:', error);
      toast.error(
        'Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.',
        { position: 'top-right' }
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main>
      <div className='contacto'>
        <h1>Contacto</h1>
        <h2>Ingresá los datos para tu reserva</h2>
      </div>
      <form className='formulario' onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre:</label>
        <input
          type='text'
          id='nombre'
          name='nombre'
          placeholder='Ingresa tu nombre'
          value={datosFormulario.nombre}
          onChange={onChange}
          required
          disabled={enviando}
        />
        <label htmlFor='email'>E-mail:</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='ej.correo@ejemplo.com'
          value={datosFormulario.email}
          onChange={onChange}
          required
          disabled={enviando}
        />
        <label htmlFor='telefono'>Teléfono:</label>
        <input
          type='tel'
          id='telefono'
          name='telefono'
          placeholder='Ingresa tu teléfono'
          value={datosFormulario.telefono}
          onChange={onChange}
          required
          disabled={enviando}
        />
        <label htmlFor='mensaje'>Mensaje:</label>
        <textarea
          id='mensaje'
          name='mensaje'
          className='mensajetextarea'
          placeholder='Escribe tu mensaje aquí'
          value={datosFormulario.mensaje}
          onChange={onChange}
          required
          disabled={enviando}
        ></textarea>
          <button
          className='icon-btn btn-index ml-30'
          type='submit'
          disabled={enviando}>
          {enviando ? 'Enviando...' : 'ENVIAR'}
        </button>
      </form>
      <ToastContainer position='top-right' />
    </main>
  );
};

export default Formulario;