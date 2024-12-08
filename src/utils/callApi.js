import handleCRUD from './handleCrud';

const callApi = async (endpoint, setter) => {
  const crudRes = await handleCRUD(
    // crudTipoAlojamientosEndpoints.readAll,
    endpoint,
    undefined,
    setter
  );

  console.log('crud res', crudRes);
};
export default callApi;
