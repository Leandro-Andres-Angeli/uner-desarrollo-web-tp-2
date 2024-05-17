import About from '../pages/About';
import Admin from '../pages/Admin';
import Contact from '../pages/Contact';
import Home from '../pages/Home';

export const routes = [
  {
    text: 'home',
    route: '/',
    exact: true,
    component: <Home></Home>,
  },
  {
    text: 'contacto',
    route: '/contacto',
    component: <Contact></Contact>,
  },
  {
    text: 'acerca',
    route: '/acerca',
    component: <About></About>,
  },
  {
    text: 'admin',
    route: '/admin',
    component: <Admin></Admin>,
  },
];
export const linksData = routes.reduce(
  (acc, { text, route }) => [...acc, { text, route }],
  []
);
