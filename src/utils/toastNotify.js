import { toast } from 'react-toastify';

const notify = (text, type = 'error') => toast[type](text);
export const notications = {
  PUT: notify('edicion realizada', 'info'),
  DELETE: notify('edicion realizada', 'warning'),
  POST: notify('elemento agregado', 'success'),
};
export default notify;
