import './normalize.css';

import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { routes } from './data/routes';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from './components/Footer';
import Components from './pages/Components';
function App() {
  return (
    <div className='App'>
      <Navbar></Navbar>

      <Switch>
        {routes.map(({ route, component, exact }) => {
          return (
            <Route key={route} exact={exact ?? false} path={route}>
              {component}
            </Route>
          );
        })}
        {/* DE MOMENTO LOS 404 REDIRECCIONAN AL HOME */}
        <Route path='/components'>
          <Components />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
        {/* DE MOMENTO LOS 404 REDIRECCIONAN AL HOME */}
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
