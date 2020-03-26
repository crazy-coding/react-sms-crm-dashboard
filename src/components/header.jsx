import React,{ Component} from 'react';


class Header extends Component {
  
  constructor( props,context){
    super(props,context);
    this.state= {}

  }
    render(){
        return (
          // <!-- Navbar-->
          <header className="app-header header">
       
          <div className="container-fluid">
             <div className="d-flex">
                <a className="header-brand" href="index.html">
                <img alt="logo" className="header-brand-img main-logo" src={require('./../assets/images/logo-png-small.png')}/>
                <img alt="logo" className="header-brand-img mobile-logo" src={require('../assets/images/logo-png-mobile.png')}/>
                </a>
                <div className="d-none d-sm-flex">
                   <a href="#" data-toggle="search" className="icon navsearch">
                   <i className="fe fe-search"></i>
                   </a>
                </div>
                
                <a aria-label="Hide Sidebar" className="app-sidebar__toggle" data-toggle="sidebar" href="#">
                <i className="si si-menu"></i>
                </a>
                <div className="header-searchinput">
                   <form className="form-inline">
                      <div className="search-element mr-3">
                         <input className="form-control header-search" type="search" placeholder="Search" aria-label="Search"/>
                         <span className="search-icon"><i className="si si-magnifier"></i></span>
                      </div>
                   </form>
                </div>
                <div className="client-balence">
                   <div className="bal-amount">
                      <span>Balence</span>
                      <span className="bal-amout">$2500</span>
                   </div>
                   <div className="top-bal">
                      <a href="">TOPUP</a>
                   </div>
                </div>
                <div className="d-flex order-lg-2 ml-auto">
                   <div className="dropdown d-sm-flex d-none header-contact">
                      <a className="nav-link icon" data-toggle="dropdown">
                      <i className="si si-bell"></i>
                      <span className="nav-unread badge badge-danger  badge-pill">3</span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                         <a className="dropdown-item text-center" href="#"> Notification List</a>
                         <div className="dropdown-divider"></div>
                         <a className="dropdown-item d-flex pb-3" href="#">
                            <span className="avatar brround mr-3 align-self-center cover-image" data-image-src="../assets/images/users/male/4.jpg"></span>
                            <div>
                               <strong>Madeleine Scott</strong> Sent you add request
                               <div className="small text-muted">
                                  view profile
                               </div>
                            </div>
                         </a>
                         <a className="dropdown-item d-flex pb-3" href="#">
                            <span className="avatar brround mr-3 align-self-center cover-image" data-image-src="../assets/images/users/female/14.jpg"></span>
                            <div>
                               <strong>rebica</strong> Suggestions for you
                               <div className="small text-muted">
                                  view profile
                               </div>
                            </div>
                         </a>
                         <a className="dropdown-item d-flex pb-3" href="#">
                            <span className="avatar brround mr-3 align-self-center cover-image" data-image-src="../assets/images/users/male/1.jpg"></span>
                            <div>
                               <strong>Devid robott</strong> sent you add request
                               <div className="small text-muted">
                                  view profile
                               </div>
                            </div>
                         </a>
                         <div className="dropdown-divider"></div>
                         <a className="dropdown-item text-center " href="#">View all Notification</a>
                      </div>
                   </div>
                   
                   <a className="nav-link pr-0 leading-none d-flex" data-toggle="dropdown" href="#">
                   <img className="avatar avatar-md brround cover-image" src={require('../assets/images/user.jpg')}/>
                   <span className="ml-2 d-none d-lg-block">
                   <span className="text-dark">Jenna Side</span>
                   </span>
                   </a>
                   <div className="dropdown d-md-flex header-settings">
                      <a href="#" className="nav-link icon" data-toggle="sidebar-right" data-target=".sidebar-right">
                      <i className="si si-logout"></i>
                      </a>
                   </div>
                </div>
             </div>
          </div>
       </header>
       

        )

    }

  }

  export default Header;

