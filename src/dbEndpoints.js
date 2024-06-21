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
const createImagen = 'createImagen';
const imagen = 'imagen/';
const updateImagen = 'updateImagen/';
const getAll = 'getAllImagenes';
export const crudImagenes = {
  readAll: `${baseURL}${imagen}${getAll}`,
  POST: `${baseURL}${imagen}${createImagen}`,
  PUT: `${baseURL}${imagen}${updateImagen}`,
};
// export const getSingleAloj = 'getTiposAlojamiento';
// export const   = '';
// export const  = '';
