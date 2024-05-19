import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SiteIcon } from '../../icons/SiteIcon';
import { linksData } from '../../data/routes';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import NavbarBtn from './NavbarBtn.js';
import navbarStyles from './navbar.module.css';
const Navbar = ({ app }) => {
  const { nav, navLogo, navLinks, header, navLinksMobile } = navbarStyles;
   
  return (
    <header className={header}>
      <nav className={nav}>
        <div className={navLogo}>
          <Link to='/' className='nav-logo-link'>
            <div className='logo'>
              <SiteIcon className={'nav-logo-icon'}></SiteIcon>
              <h2 className='texto'>Alojar</h2>
            </div>
          </Link>
        </div>
        {/* links desktop */}
        <ul className={`${navLinks}  `}>
          {linksData.map(({ text, route }) => (
            <li key={text}>
              {' '}
              {/* CAMBIAR ESTE EXACT AL ARMAR LAS SUBRUTAS!! */}
              <NavLink to={route} exact activeClassName='nav-link-active'>
                {text}
              </NavLink>
              {/* CAMBIAR ESTE EXACT AL ARMAR LAS SUBRUTAS!! */}
            </li>
          ))}
        </ul>
        {/* links desktop    */}
        {/* links mobile    */}

        <ul className={`${navLinksMobile}  navLinksMobile `}>
          {linksData.map(({ text, route }) => (
            <li key={text}>
              {' '}
              {/* CAMBIAR ESTE EXACT AL ARMAR LAS SUBRUTAS!! */}
              <NavLink to={route} exact activeClassName='nav-link-active'>
                {text}
              </NavLink>
              {/* CAMBIAR ESTE EXACT AL ARMAR LAS SUBRUTAS!! */}
            </li>
          ))}
        </ul>

        {/* links mobile    */}
        <NavbarBtn app={app}></NavbarBtn>
      </nav>
    </header>
  );
};

export default Navbar;
