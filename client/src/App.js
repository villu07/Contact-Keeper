import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Components/layouts/Navbar";
import Home from "./Components/pages/Home";
import About from "./Components/pages/About";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Alert from "./Components/layouts/Alert";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

import "./App.css";

import ContactState from "./Components/Context/Contact/ContactState";
import AlertState from "./Components/Context/Alert/AlertState";
import AuthState from "./Components/Context/Auth/AuthState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/" component={Home} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
