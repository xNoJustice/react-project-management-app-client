import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Layout from "./components/layouts/Layout";
import NotFound from "./components/pages/NotFound";
import jwt_decode from "jwt-decode";
import { setToken } from "./utils/api";
import store from "./store";
import { Provider } from "react-redux";
import { setCurrentUser, logoutUser } from "./actions/authActions";

const history = createBrowserHistory();

if (localStorage.getItem("token") && localStorage.getItem("token") !== null) {
  const token = localStorage.getItem("token");

  setToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(history));
    window.location.href = "./";
  }
}
export default class App extends Component {
  render() {
    return (
      <Provider history={history} store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Layout} />
            <PrivateRoute exact path="/project/:id" component={Layout} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
