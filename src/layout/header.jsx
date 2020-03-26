import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import axios from 'axios';
import config from '../config/index';
import {connect} from 'react-redux';
import {
  toggleNotify, 
  toggleMenu, 
  logout,
  receiveFetchData,
  setAuth } from '../actions/index';



class header extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount () {
    this.fetch_header_data();
    this.getMyData();
  }

  fetch_header_data = () => {
    axios({
      method:"GET",
      url:config.headers, 
      headers: {
        "Authorization" : this.props.auth.token_type + " " + this.props.auth.access_token
      },
      data:{
        
      }
    })
    .then(res => {
      console.log("header_api_success:", res)
      this.props.receiveFetchData({
        headers: { ...this.props.headers, ...res }
      });
    }).catch(err=>{
      console.log("header_api_error:", err);
      this.props.receiveFetchData({
        headers: { ...this.props.headers,
          user_balance: 2500,
          header_notifications: [{
            name: 'Devid robotter',
            message: 'Suggestions for you',
            avatar: '../assets/images/users/male/1.jpg',
            url: '/sdf/sdf/sdf'
          }, {}]
        }
      });
    });
  };

  getMyData = () => {
    if (this.props.auth.isLoggedIn) {
      axios({
        method:"GET",
        url:config.me,
        headers: {
          "Authorization" : this.props.auth.token_type + " " + this.props.auth.access_token
        },
      })
      .then(res => {
        console.log("me_api_success:", res)
        this.props.setAuth(res.data)
      }).catch(err=>{
        console.log("me_api_error:", err);
        if (typeof err.response.data.message == 'string') {
          this.props.setMessage({ global_message: err.response.data.message })
        }
      });
    }
  }

  render () {
    let toggleClass = '';
    if(this.props.toggleNotifyDropDown === true){
      toggleClass = 'show';
    }

    const user_balance = this.props.auth.sms_limit || "0";
    const { auth } = this.props;
    const header_notifications =  this.props.headers.header_notifications || [];

    return (
      <React.Fragment>
        <header className='app-header header'>
          <div className='container-fluid'>
            <div className='d-flex'>
              <a className='header-brand' href='index.html'>
                <img alt='logo' className='header-brand-img main-logo' src={require("../assets/images/logo-png-small.png")} />
                <img alt='logo' className='header-brand-img mobile-logo' src={require("../assets/images/logo-png-mobile.png")} />
              </a>
              <div className='d-none d-sm-flex'>
                <a href='#' data-toggle='search' className='icon navsearch'>
                  <i className='fe fe-search'></i>
                </a>
              </div>

              <a aria-label='Hide Sidebar' onClick={this.props.toggleMenu} className='app-sidebar__toggle' data-toggle='sidebar' href='#'>
                <i className='si si-menu'></i>
              </a>
              <div className='header-searchinput'>
                <form className='form-inline'>
                  <div className='search-element mr-3'>
                    <input className='form-control header-search' type='search' placeholder='Search' aria-label='Search' />
                    <span className='search-icon'>
                      <i className='si si-magnifier'></i>
                    </span>
                  </div>
                </form>
              </div>
              <div className='client-balence'>
                <div className='bal-amount'>
                  <span>Balence</span>
                  <span className='bal-amout'>${user_balance | '0'}</span>
                </div>
                <div className='top-bal'>
                  <a href='#render-target'>TOPUP</a>
                </div>
              </div>
              <div className='d-flex order-lg-2 ml-auto'>
                <div className={['dropdown d-sm-flex d-none header-contact',toggleClass].join(' ')} onClick={this.props.toggleNotify}>
                  <a className='nav-link icon' data-toggle='dropdown'>
                    <i className='si si-bell'></i>
                    <span className='nav-unread badge badge-danger  badge-pill'>{header_notifications.length}</span>
                  </a>
                  <div className={['dropdown-menu dropdown-menu-right dropdown-menu-arrow',toggleClass].join(' ')}>
                    <a className='dropdown-item text-center' href='#'>
                      {' '}
                      Notification List
                    </a>
                    <div className='dropdown-divider'></div>
                    {header_notifications.map((sItem, k) => 
                      <a className='dropdown-item d-flex pb-3' href={sItem.url} key={k}>
                        <span className='avatar brround mr-3 align-self-center cover-image' data-image-src={sItem.avatar}></span>
                        <div>
                          <strong>{sItem.name}</strong> {sItem.message}
                          <div className='small text-muted'>view profile</div>
                        </div>
                      </a>
                    )}
                    <div className='dropdown-divider'></div>
                    <a className='dropdown-item text-center ' href='#'>
                      View all Notification
                    </a>
                  </div>
                </div>

                <a className='nav-link pr-0 leading-none d-flex' data-toggle='dropdown' href='#'>
                  <img className='avatar avatar-md brround cover-image' src={auth.image ? auth.image : require("../assets/images/user.jpg")}/>
                  <span className='ml-2 d-none d-lg-block'>
                    <span className='text-dark text-capitalize'>{auth.name} {auth.lname}</span>
                  </span>
                </a>
                <div className='dropdown d-md-flex header-settings'>
                  <a href='#' onClick={this.props.logout} className='nav-link icon' data-toggle='sidebar-right' data-target='.sidebar-right'>
                    <i className='si si-logout'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => { 
  return {
    auth: state.auth,
    toggleNotifyDropDown: state.animate.toggleNotify,
    headers: state.data.headers
  }
}

const mapDispatchAction = {
  toggleMenu: toggleMenu,
  toggleNotify: toggleNotify,
  logout: logout,
  receiveFetchData: receiveFetchData,
  setAuth: setAuth
}

export default connect(mapStateToProps,mapDispatchAction)(header);