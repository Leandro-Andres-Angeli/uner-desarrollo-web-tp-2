const baseURL = 'http://localhost:3001/';

const tiposDeAlojamiento = 'tiposAlojamiento/';
const getAllTiposDeAlojamiento = 'getTiposAlojamiento';
const createTipoAlojamiento = 'createTipoAlojamiento';
const putTipoAlojamiento = 'putTipoAlojamiento';
const deleteTipoAlojamiento = 'deleteTipoAlojamiento';
export const crudTipoAlojamientosEndpoints = {
  readAll: 'http://localhost:3001/tiposAlojamiento/getTiposAlojamiento',
  POST: `${baseURL}${tiposDeAlojamiento}${createTipoAlojamiento}`,
  PUT: `${baseURL}${tiposDeAlojamiento}${putTipoAlojamiento}`,
  DELETE: `${baseURL}${tiposDeAlojamiento}${deleteTipoAlojamiento}`,
};

// export const getSingleAloj = 'getTiposAlojamiento';
// export const   = '';
// export const  = '';
