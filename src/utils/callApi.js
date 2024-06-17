import handleCRUD from './handleCrud';

const callApi = async (endpoint, setter) => {
  await handleCRUD(endpoint, undefined, setter);
};
export default callApi;
