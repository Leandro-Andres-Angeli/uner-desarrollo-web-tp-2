import "./normalize.css";

import { Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "./components/Footer";
import Components from "./pages/Components";
import Alojamiento from "./pages/alojamiento/Alojamiento";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="App" data-mobile-nav-link="hidden">
      <Navbar></Navbar>

      <Switch>
        {routes.map(({ route, component, exact }) => {
          return (
            <Route
              key={route}
              exact={exact ?? false}
              strict={false}
              path={route}
            >
              {component}
            </Route>
          );
        })}
        <Route path="/alojamiento/:id">
          <Alojamiento />
        </Route>
        {/* DE MOMENTO LOS 404 REDIRECCIONAN AL HOME */}
        <Route path="/components">
          <Components />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
        {/* DE MOMENTO LOS 404 REDIRECCIONAN AL HOME */}
      </Switch>
      <Footer>
      <Link to="/contacto">Contacto</Link>
      <Link to="/Acerca">Contacto</Link>

      </Footer>
    </div>
  );
}

export default App;
