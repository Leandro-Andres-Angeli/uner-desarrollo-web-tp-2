import React, { useEffect, useReducer, useRef, useState } from 'react';
import navbarStyle from './navbarBtn.module.css';
const NavbarBtn = ({ setMenuDisplay, hidden, visible, app }) => {
  const [iconRotate, setHandleRotate] = useState('');
  // const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState('hidden');
  // const handleRotate = () => {
  //   setHandleRotate((prev) => (prev === '' ? navbarStyle.rotate : ''));
  // };
  // const docWrapper =   document.body.querySelector('.App');
  const docWrapper = useRef();
  const test = () => console.log('dont class');
  // useEffect(() => {
  //   docWrapper.current = document.body.querySelector('.App');

  //   return () => {
  //     console.log('onmount');
  //     Boolean(docWrapper.current.classList.contains('navLinksMobileHidden')) ===
  //     false
  //       ? docWrapper.current.addEventListener('click', test)
  //       : docWrapper.current.removeEventListener('click', test);
  //   };
  // }, []);
  // const handleAppClassName = () => {
  //   console.log('handling class');
  //   docWrapper.current.classList.add('navLinksMobileHidden');
  // };
  useEffect(() => {
    console.log('render empy dep');
    docWrapper.current = document.querySelector('.App');
    console.log(
      docWrapper.current.setAttribute('data-mobile-nav-link', mobileMenuVisible)
    );
  }, [mobileMenuVisible]);

  // useEffect(() => {
  //   if (isMobileMenuVisible) {
  //     docWrapper.current.addEventListener(
  //       'click',
  //       function (e) {
  //         e.stopPropagation();

  //         handleAppClassName();
  //       },
  //       true
  //     );
  //   }
  //   return () => {
  //     console.log('UNMOUNT');
  //   };
  // }, [isMobileMenuVisible]);

  /* const handleMenuDisplay = (e) => {
    console.log('menu display');
    console.log(docWrapper.current);
    docWrapper.current.classList.toggle('navLinksMobileHidden');
    setMenuDisplay((prev) => (prev === hidden ? visible : hidden));
  }; */

  // const handleMenuDisplay = (e) => {
  //   e.stopPropagation();
  //   e.nativeEvent.stopImmediatePropagation();
  //   setIsMobileMenuVisible((prev) => !prev);
  //   isMobileMenuVisible
  //     ? docWrapper.current.classList.remove('navLinksMobileHidden')
  //     : docWrapper.current.classList.add('navLinksMobileHidden');
  // };

  const handleMenuDisplay = () => {
    setMobileMenuVisible((prev) => (prev === 'hidden' ? 'visible' : 'hidden'));
  };
  return (
    <button
      onPointerDown={handleMenuDisplay}
      className={`${navbarStyle.navbarBtn} btn-primary ${iconRotate} ${navbarStyle.navbarBtnDisplay}`}
    >
      <div>
        <span></span>
      </div>
    </button>
  );
};

export default NavbarBtn;
