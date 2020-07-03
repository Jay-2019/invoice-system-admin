import React, { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";
import { NoMatch } from './components/index';
import './App.css';

export default function App() {
  return (
    <StrictMode>
      <div className="App">
        <header className="App-header">
          < div className="container-fluid">
            <Router>
              <Switch>
                {publicRoutes()}
                {privateRoutes()}
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </Router>
          </div>
        </header>
      </div>
    </StrictMode>
  );
}


