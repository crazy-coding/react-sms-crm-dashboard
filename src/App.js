import React, { Component } from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import icon from "glyphicons";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "underscore";
import Layout from "./layout/layout";
import Dashboard from "./components/dashboard";
import AccountSettings from "./components/account-setting";
import Billing from "./components/billing";
import CampaignManagement from './components/campaigns-management'
import DomainManagement from './components/domain-management'
import PoolManagement from './components/pool-management'
import TemplateManagement from './components/template-management'
import ListImport from './components/list-import'
import ListManagement from './components/list-management'
import ListClients from './components/list-clients'
import ListMarge from './components/list-marge'
import PhoneNumber from './components/phone-number'
import Register from './components/register'
import SendBulkSms from './components/send-bulk-sms'
import ModalUI from './components/modal'
import { connect } from "react-redux";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isLoggedin = this.props.isLoggedIn;
    return (
      <BrowserRouter>
        <Switch>

          <Route
            exact
            path="/"
            render={route => (
              <Layout component={isLoggedin ? Dashboard : Login} route={route} />
            )}
          />

          <Route
            exact
            path="/login"
            render={route => (
              <Layout component={isLoggedin ? Dashboard : Login} route={route} />
            )}
            />

          <Route
            exact
            path="/register"
            render={route => (
              <Layout component={isLoggedin ? Dashboard : Register} />
            )}
            />

          <Route
            exact
            path="/dashboard"
            render={route => <Layout component={isLoggedin ? Dashboard : Login} route={route} />}
          />
          
          <Route
            exact
            path="/account-settings"
            render={route => <Layout component={isLoggedin ? AccountSettings : Login} route={route} />}
          />

          <Route
            exact
            path="/billing"
            render={route => <Layout component={isLoggedin ? Billing : Login} route={route} />}
          />
          
          <Route
          exact
          path="/campaign-management"
          render={route => <Layout component={isLoggedin ? CampaignManagement : Login} route={route} />}
          />

          <Route
          exact
          path="/domain-management"
          render={route => <Layout component={isLoggedin ? DomainManagement : Login} route={route} />}
          />

          <Route
          exact
          path="/pool-management"
          render={route => <Layout component={isLoggedin ? PoolManagement : Login} route={route} />}
          />
          
          <Route
          exact
          path="/template-management"
          render={route => <Layout component={isLoggedin ? TemplateManagement : Login} route={route} />}
          />

          <Route
          exact
          path="/list-import"
          render={route => <Layout component={isLoggedin ? ListImport : Login} route={route} />}
          />

          <Route
          exact
          path="/list-management"
          render={route => <Layout component={isLoggedin ? ListManagement : Login} route={route} />}
          />

          <Route
          exact
          path="/list-clients"
          render={route => <Layout component={isLoggedin ? ListClients : Login} route={route} />}
          />

          <Route
          exact
          path="/list-marge"
          render={route => <Layout component={isLoggedin ? ListMarge : Login} route={route} />}
          />

          <Route
          exact
          path="/phone-number"
          render={route => <Layout component={isLoggedin ? PhoneNumber : Login} route={route} />}
          />

          <Route
          exact
          path="/send-bulk-sms"
          render={route => <Layout component={isLoggedin ? SendBulkSms : Login} route={route} />}
          />

          <Route
          exact
          path="/modal"
          render={route => <Layout component={isLoggedin ? ModalUI : Login} route={route} />}
          />

        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.auth };
};

const mapDispatchToProps = {
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default App;
