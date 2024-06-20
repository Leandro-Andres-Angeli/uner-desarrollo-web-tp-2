import React, { useEffect } from 'react';

import LoadingIcon from '../../components/LoadingIcon';

const EntitiesList = ({ error, loading, list, children }) => {
  useEffect(() => {
    // console.log('render');
    return () => {};
  }, [list]);

  if (error) {
    <LoadingIcon></LoadingIcon>;
    // return <h1>Error</h1>;
  }
  if (loading) {
    return <LoadingIcon></LoadingIcon>;
  }
  return (
    <>
      <h2>Listado : Tipos de Alojamientos</h2>

      {list && children}
    </>
  );
};
export default EntitiesList;
