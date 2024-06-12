const baseURL = 'http://localhost:3001/';

const tiposDeAlojamiento = 'tiposAlojamiento/';
const getAllTiposDeAlojamiento = 'getTiposAlojamiento';
const createTipoAlojamiento = 'createTipoAlojamiento';
const putTipoAlojamiento = 'putTipoAlojamiento';
const deleteTipoAlojamiento = 'deleteTipoAlojamiento';
/////

export const crudTipoAlojamientosEndpoints = {
  readAll: `${baseURL}${tiposDeAlojamiento}${getAllTiposDeAlojamiento}`,
  POST: `${baseURL}${tiposDeAlojamiento}${createTipoAlojamiento}`,
  PUT: `${baseURL}${tiposDeAlojamiento}${putTipoAlojamiento}`,
  DELETE: `${baseURL}${tiposDeAlojamiento}${deleteTipoAlojamiento}`,
};

const alojamiento = 'alojamiento/';
const getAllAlojamientos = 'getAlojamientos';
const getAlojamiento = 'getAlojamiento';
const createAlojamiento = 'createAlojamiento';
const putAlojamiento = 'putAlojamiento';
const deleteAlojamiento = 'deleteAlojamiento';
export const crudAlojamientosEndpoints = {
  readAll: `${baseURL}${alojamiento}${getAllAlojamientos}`,
  readOne: `${baseURL}${alojamiento}${getAlojamiento}`,
  POST: `${baseURL}${alojamiento}${createAlojamiento}`,
  PUT: `${baseURL}${alojamiento}${putAlojamiento}`,
  DELETE: `${baseURL}${alojamiento}${deleteAlojamiento}`,
};
export const crudImagenes = {
  readAll: `${baseURL}imagen/getAllImagenes`,
};
// export const getSingleAloj = 'getTiposAlojamiento';
// export const   = '';
// export const  = '';
