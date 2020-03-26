import React, { Component } from "react";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import config from '../config/index';
import axios from "axios";
import '../assets/css/sidemenu-light.css';
import loader from "../assets/images/loader.gif";
import { setMessage } from "../actions/index";
import { connect } from "react-redux";



class AccountSettings extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addAttributes: {
        first_name: '',
        last_name: '',
        company: '',
        website: '',
        email: '',
        phone: '',
        shopify_token: '',
        shopify_url: '',
        address: '',
        state: '',
        city: '',
        postcode: ''

      },
      message: {},
      isLoader: false
    };
  }

  setAddHandler = (e) => {
    let copyAddAttributes = { ...this.state.addAttributes };
    copyAddAttributes[e.target.name] = e.target.value;
    this.setState({
      addAttributes: copyAddAttributes,
    });
  }

  addAction = () => {
    // event.preventDefault();
    console.log("Testing if data is sumitted Properly", this.state.addAttributes);
    axios({
      method: "PATCH",
      headers: { 'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` },
      url: config.me,
      data: {
        ...this.state.addAttributes
      }
    })
      .then(res => {
        console.log("accounts_settings_update_api_success:", res)
        this.props.setMessage({
          global_message: res.data.message
        })
        this.setState({ isLoader: false });
        window.location.reload();
      }).catch(err => {
        console.log("accounts_settings_update_api_error:", err.response);
        this.setState({
          message: err.response.data.message
        });
        this.setState({ isLoader: false });
      });
  };

  render() {
    const { first_name, last_name, company, website, email, phone, shopify_token,
      shopify_url, address, state, city, postcode } = this.state.addAttributes;
      const { message, isLoader } = this.state;
      const global_message = this.props.global_message || '';
    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Account Setting</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Account</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Account Setting
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card account-form'>
                <form method='post'>
                  <div className='card-header'>
                    <h4 className='card-title'>
                      <em>Please fill your details</em>
                    </h4>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-12'>
                      <div className={global_message ? 'alert alert-info' : 'alert alert-info d-none'} id="global_message">{global_message}</div>
                        <div className='form-group'>
                          <label className='form-label'>First Name</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='first_name' value={first_name} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.first_name}</p>
                            {/* <p>
                              <em>Enter the First name.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Last Name</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='last_name' value={last_name} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.last_name}</p>
                            {/* <p>
                              <em>Enter the Last name.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Company</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='company' value={company} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.company}</p>
                            {/* <p>
                              <em>Enter Company name.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Email</label>
                          <div className='form-wrap'>
                            <input type='email' className='form-control' name='email' value={email} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.email}</p>
                            {/* <p>
                              <em>Enter the Email.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Phone (International format)</label>
                          <div className='form-wrap'>
                            <input type='tel' className='form-control' name='phone' value={phone} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.phone}</p>
                            {/* <p>
                              <em>Enter International format phone.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Website</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='website' value={website} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.website}</p>
                            {/* <p>
                              <em>Enter Website Url.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Address 1</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='address' value={address} onChange={this.setAddHandler}/>
                            <p className="login-form-error">{message.address}</p>
                            {/* <p>
                              <em>Enter the Address 1.</em>
                            </p> */}
                          </div>
                        </div>
                        {/* <div className='form-group'>
                          <label className='form-label'>Address 2</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='example-text-input' value={name} onChange={this.setAddHandler}/>
                            <p>
                              <em>Enter the Address 2.</em>
                            </p>
                          </div>
                        </div> */}
                        <div className='form-group'>
                          <label className='form-label'>City</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='city' value={city} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.city}</p>
                            {/* <p>
                              <em>Enter your City.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>State</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='state' value={state} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.state}</p>
                            {/* <p>
                              <em>Enter your State.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Zip Code</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='postcode' value={postcode} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.postcode}</p>
                            {/* <p>
                              <em>Enter Zip Code.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Shopify Token</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='shopify_token' value={shopify_token} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.shopify_token}</p>
                            {/* <p>
                              <em>Enter Shopify Token.</em>
                            </p> */}
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Shopify Url</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='shopify_url' value={shopify_url} onChange={this.setAddHandler} />
                            <p className="login-form-error">{message.shopify_url}</p>
                            {/* <p>
                              <em>Enter Shopify Url.</em>
                            </p> */}
                          </div>
                        </div>
                        {/* <div className='form-group'>
                          <label className='form-label'>Country</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='example-text-input' value={name} onChange={this.setAddHandler}/>
                            <p>
                              <em>Enter your Country.</em>
                            </p>
                          </div>
                        </div> */}

                        <div className='account-btn'>
                          <button type='button' className='btn btn-primary mr-3 submit' onClick={this.addAction}>
                            <i className='si si-plus mr-2 text-white'></i>Submit
                          </button>
                          <button type='button' className='btn btn-primary clear'>
                            <i className='si si-refresh mr-2 text-white'></i>Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  // receiveFetchData: receiveFetchData,
  setMessage: setMessage
};

AccountSettings = connect(
  mapStateToProps,
  mapDispatchToProps
 
)(AccountSettings);
export default AccountSettings;