import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink } from "react-router-dom";
import Navigation from "./../config/menu.json";
import _ from "underscore";
import { toggleShow, 
  toggleMenuOne, 
  toggleMenuTwo, 
  toggleMenuThree } from '../actions'


function SidebarNavItem(props) {
  const { item, pathname, index, toggleMenuOne } = props;

  let findPathIfexist = item.submenu.find((sm) => pathname.includes(sm.slug));

  let isOpen = findPathIfexist ? true : false;

  let shouldExpand = item.expanded || isOpen;

  return (
    <li
      className={shouldExpand ? "slide is-expanded" : "slide"}
      onClick={() => toggleMenuOne(index)}>
      <a
        className={`side-menu__item ${isOpen && "active"}`}
        data-toggle='slide'>
        <i className='side-menu__icon si si-volume-2'></i>
        <span className='side-menu__label'>{item.name}</span>
        <i className='angle si si-arrow-right'></i>
      </a>
      <ul className='slide-menu' onClick={() => toggleMenuOne(index)}>
        {item.submenu.map((sItem, k) => {
          return (
            <li key={`---${k}`}>
              <NavLink
                to={`/${sItem.slug}`}
                exact
                className='slide-item'
                activeClassName='active'>
                {sItem.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

class sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      navItems: []
    };
    this.toggleMenuOne = this.toggleMenuOne.bind(this);
  }

  renderView = ({ style, ...props }) => {
    const color = 255;
    const customStyle = {
      backgroundColor: `rgb(${color}, ${color}, ${color},.3)`
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  componentDidMount() {
    this.setState({ navItems: Navigation.menu });
  }

  toggleMenuOne(key) {
    let navItems = [...this.state.navItems].map((n) => {
      if (n.hasOwnProperty("expanded")) n.expanded = false;
      return n;
    });
    let item = navItems[key];
    if (item.hasOwnProperty("expanded")) item.expanded = !item.expanded;
    navItems[key] = item;
    this.setState({ navItems });
  }

  render() {
    // console.log("MENU", this.props.myAccount);

    const { location } = this.props.route;
    let pathname = location.pathname;
    const { email, skype, telegram, phone, ext, image } = this.props.myAccount;

    return (
      <React.Fragment>
        <div className='app-sidebar__overlay' data-toggle='sidebar'></div>

        <aside className='app-sidebar' onMouseEnter={this.props.toggleMenu}>
          <Scrollbars
            renderThumbVertical={this.renderView}
            thumbMinSize={4}
            className='scrollBar'
            style={{ height: "100%" }}
            autoHide
            autoHideTimeout={1000}>
            <div className='app-sidebar__user'>
              <div className='user-body mb-1'>
                <img
                  className='avatar avatar-lg brround text-center cover-image'
                  src={image ? image : require("../assets/images/dummy-profile-pic.jpg")}
                />
              </div>
              <div className='user-info'>
                <a href='#' className='ml-2'>
                  <span className='text-dark app-sidebar__user-name font-weight-semibold'>
                    Your Account Manager
                  </span>
                  <br />
                </a>
                <div className='user-detail'>
                  <div className='user-detail-wrap'>
                    <span className='info'>Skype:</span>{" "}
                    <span className='details'>{skype}</span>
                  </div>
                  <div className='user-detail-wrap'>
                    <span className='info'>Telegram:</span>{" "}
                    <span className='details'>{telegram}</span>
                  </div>
                  <div className='user-detail-wrap'>
                    <span className='info'>Phone:</span>{" "}
                    <span className='details'>
                      <a href='tel:{phone}'>{phone}</a>
                    </span>
                  </div>
                  <div className='user-detail-wrap'>
                    <span className='info'>Ext:</span>{" "}
                    <span className='details'>{ext || ''}</span>
                  </div>
                  <div className='user-detail-wrap'>
                    <span className='info'>Email:</span>{" "}
                    <span className='details'>
                      <a href='mailto:{email}'>{email}</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <ul className='side-menu'>
              {[...this.state.navItems].map((item, i) => {
                {
                  if (_.has(item, "submenu")) {
                    return (
                      <SidebarNavItem
                        toggleMenuOne={this.toggleMenuOne}
                        pathname={pathname}
                        index={i}
                        key={i}
                        item={item}
                      />
                    );
                  } else {
                    return (
                      <li onClick={() => this.toggleMenuOne(i)} key={i}>
                        <NavLink
                          to={`/${item.slug}`}
                          exact
                          className='side-menu__item'
                          activeClassName='active'>
                          <i className='side-menu__icon si si-grid'></i>
                          <span className='side-menu__label'>{item.name}</span>
                        </NavLink>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </Scrollbars>
        </aside>
      </React.Fragment>
    );
  }
}

const mapDispatchAction = {
  toggleMenu: toggleShow,
  toggleMenuOne: toggleMenuOne,
  toggleMenuTwo: toggleMenuTwo,
  toggleMenuThree: toggleMenuThree,
};

const mapStateToprops = (state) => {
  const { menuOne, menuTwo, menuThree } = state.animate;
  const { auth } = state;
  return {
    menuOne: menuOne,
    menuTwo: menuTwo,
    menuThree: menuThree,
    myAccount: auth
  };
};

export default connect(
  mapStateToprops,
  mapDispatchAction
)(sidebar);
