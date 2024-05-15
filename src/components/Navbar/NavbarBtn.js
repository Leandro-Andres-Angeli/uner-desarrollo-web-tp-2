import React, { useState } from 'react';
import navbarStyle from './navbarbtn.module.css';
const NavbarBtn = () => {
  console.log(navbarStyle);
  const [iconRotate, setHandleRotate] = useState('');
  const handleRotate = () => {
    setHandleRotate((prev) => (prev === '' ? navbarStyle.rotate : ''));
  };
  return (
    <button
      className={`${navbarStyle.navbarBtn} btn-primary ${iconRotate}`}
      onClick={handleRotate}
    >
      <div>
        <span></span>
      </div>
    </button>
  );
};

export default NavbarBtn;
