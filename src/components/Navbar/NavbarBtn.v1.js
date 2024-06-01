import React, { useEffect, useState } from 'react';
import navbarStyle from './navbarbtn.module.css';
const NavbarBtn = ({ setMenuDisplay, hidden, visible }) => {
  // console.log(navbarStyle);
  const [iconRotate, setHandleRotate] = useState('');
  const handleRotate = () => {
    setHandleRotate((prev) => (prev === '' ? navbarStyle.rotate : ''));
  };
  const handleMenuDisplay = (callback) => {
    setMenuDisplay((prev) => (prev === hidden ? visible : hidden));
    callback();
  };

  return (
    <button
      onClick={() => handleMenuDisplay(handleRotate)}
      className={`${navbarStyle.navbarBtn} btn-primary ${iconRotate} ${navbarStyle.navbarBtnDisplay}`}
    >
      <div>
        <span></span>
      </div>
    </button>
  );
};

export default NavbarBtn;
