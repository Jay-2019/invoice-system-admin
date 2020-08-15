import React, { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";
import { NoMatch } from './components/index';
import './App.css';
import { useNavigationBar } from "./components/index";

export default function App() {
  const navigationBar = useNavigationBar();
  return (
    <StrictMode>
      <div className="App">
        <header className="App-header">
          < div className="container-fluid">
            {navigationBar}
            <hr />
            <div className="d-flex justify-content-center">
              <div className="col-sm-12 col-md-8">
                <div className="card text-white bg-dark border-light ">
                  <Router>
                    <Switch>
                      {publicRoutes()}
                      {privateRoutes()}
                      <Route path="*">
                        <NoMatch />
                      </Route>
                    </Switch>
                  </Router>
                  <div className="card-footer border-secondary text-center">
                    {" Faculty of engineering & technology"}
                  </div>
                </div>
              </div>
            </div>
          </ div>
        </header>
      </div>
    </StrictMode>
  );
}


