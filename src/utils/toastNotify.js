import { toast } from 'react-toastify';

const notify = (text, type = 'error') => toast[type](text);
export default notify;
