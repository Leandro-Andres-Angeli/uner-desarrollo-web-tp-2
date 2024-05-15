import React from 'react';
import { SiteIcon } from '../../icons/SiteIcon';
import { linksData } from '../../data/routes';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import NavbarBtn from './NavbarBtn';

const Navbar = () => {
  return (
    <header>
      <nav className='nav'>
        <div className='nav-logo'>
          <a href='index.html' className='nav-logo-link'>
            <div className='logo'>
              <SiteIcon className={'nav-logo-icon'}></SiteIcon>
              <h2 className='texto'>Alojar</h2>
            </div>
          </a>
        </div>

        <ul className='nav--links'>
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
        <NavbarBtn></NavbarBtn>
      </nav>
    </header>
  );
};

export default Navbar;
