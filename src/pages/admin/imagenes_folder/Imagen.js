import React from 'react';
import {
  useLocation,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';

const Imagen = () => {
  const params = useParams();
  console.log(params);
  const location = useLocation();
  console.log(location);
  return <div>Imagen</div>;
};

export default Imagen;
