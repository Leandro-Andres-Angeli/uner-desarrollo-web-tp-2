import handleCRUD from './handleCrud';

const callApi = async (endpoint, setter) => {
  await handleCRUD(
    // crudTipoAlojamientosEndpoints.readAll,
    endpoint,
    undefined,
    setter
  );
};
export default callApi;
