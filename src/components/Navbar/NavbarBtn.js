import React, { useEffect, useReducer, useRef, useState } from 'react';
import navbarStyle from './navbarbtn.module.css';
const NavbarBtn = ({
  setMenuDisplay,
  hidden,
  visible,
  app,
  mobileNavbarDisplay,
  setmobileNavbarDisplay,
}) => {
  const [iconRotate, setHandleRotate] = useState('');
  // const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState('hidden');
  // const handleRotate = () => {
  //   setHandleRotate((prev) => (prev === '' ? navbarStyle.rotate : ''));
  // };
  // const docWrapper =   document.body.querySelector('.App');
  const docWrapper = useRef();

  // useEffect(() => {
  //   docWrapper.current = document.querySelector('.App');
  // }, []);

  useEffect(() => {
    docWrapper.current = document.querySelector('.App');
    docWrapper.current.setAttribute('data-mobile-nav-link', mobileMenuVisible);
    function handleOutSideClick(e) {
      if (
        e.target &&
        e.target.closest('button') &&
        e.target.closest('button').classList.contains('mobile-nav-btn')
      ) {
        return;
      }

      setMobileMenuVisible('hidden');
    }
    if (mobileMenuVisible === 'visible') {
      docWrapper.current.addEventListener('click', handleOutSideClick, true);
    }
    return () => {
      return docWrapper.current.removeEventListener(
        'click',
        handleOutSideClick,
        true
      );
    };
  }, [docWrapper, mobileMenuVisible]);

  const handleMenuDisplay = () => {
    setMobileMenuVisible((prev) => (prev === 'hidden' ? 'visible' : 'hidden'));
  };
  return (
    <button
      onPointerDown={handleMenuDisplay}
      className={`${navbarStyle.navbarBtn} mobile-nav-btn btn-primary ${iconRotate} ${navbarStyle.navbarBtnDisplay}`}
    >
      <div>
        <span></span>
      </div>
    </button>
  );
};

export default NavbarBtn;
