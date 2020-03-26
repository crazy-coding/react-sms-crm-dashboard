import React, { Component } from "react";
import Dashboard from "./../components/dashboard";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "../layout/sidebar";
import Header from "../layout/header";
import { Container } from "reactstrap";
import loader from "../assets/images/loader.gif";
import { connect } from "react-redux";
import { toggleNotifyClose } from '../actions'


class layout extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount () {}

  render () {
    const Component = this.props.component;
    const route = this.props.route;
    
    let toggleClass = "sidebar-mini";

    if (this.props.animate.toggleSidebar == false) {
      toggleClass = ["sidebar-mini", "sidenav-toggled"].join(" ");
    }

    if (this.props.animate.isCheckingAuth) {
      return (
        <div id='global-loader'>
          <img src={loader} alt='loader' />
        </div>
      )
    }

    if (!this.props.auth.isLoggedIn) {
      return <Component {...this.state} route={route} />;
    }

    return (
      <div className={toggleClass}>
        <div className='page'>
          <div className='page-main'>
            <Header />
            <Sidebar route={route} />
            <div className=' app-content my-3 my-md-5' onClick={this.props.toggleNotifyClose}>
              {this.props.message.global_message && <div className="alert alert-info" id="global_message">{this.props.message.global_message}</div>}
              <Component {...this.state} route={route} />
              <footer className='footer'>
                <div className='container'>
                  <div className='row align-items-center flex-row-reverse text-white-50'>
                    <div className='col-md-12 col-sm-12 text-center'>
                      Copyright © <a href=''>SendSMS</a>. All rights reserved.
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return { ...state };
};
const mapDispatchToProps = {
  toggleNotifyClose: toggleNotifyClose
};

layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(layout);
export default layout;
