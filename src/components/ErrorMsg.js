import React from 'react';

const ErrorMsg = ({
  msg = 'Ha ocurrido un error',
  stylesClassNames = 'error-msg-styles',
}) => {
  return <div className={`${stylesClassNames}`}>{msg}</div>;
};

export default ErrorMsg;
