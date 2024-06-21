import React from 'react';
import formStyles from '../tipoAlojamientosForm/tipoAlojamientosForm.module.css';
export const AdminFormBtn = ({ text, actionType, stylesClassName }) => (
  <button
    className={`btn-${stylesClassName}`}
    data-action={actionType}
    key={actionType}
    style={{ marginRight: 5 }}
    type='submit'
  >
    {text}
  </button>
);
export const ButtonsWrapper = ({ children }) => {
  const { formActionsContainer } = formStyles;
  return <div className={`${formActionsContainer}`}>{children}</div>;
};

export default ButtonsWrapper;
