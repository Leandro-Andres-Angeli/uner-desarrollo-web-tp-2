import React, { useEffect } from 'react';
import EntityLi from './EntityLi';
import LoadingIcon from '../../components/LoadingIcon';

const EntitiesList = ({ error, loading, list }) => {
  useEffect(() => {
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

      <ul>
        {list &&
          list.map((el) => (
            <EntityLi key={el.idTipoAlojamiento} {...{ el }}></EntityLi>
          ))}
      </ul>
    </>
  );
};
export default EntitiesList;
