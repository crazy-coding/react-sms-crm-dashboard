import React, { Component } from "react";
import config from '../config/index';
import axios from "axios";
import { connect } from "react-redux";
import { login, setMessage } from "../actions/index";
import loader from "../assets/images/loader.gif";

import {
  Alert,
  Col,
  Row,
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { withRouter } from 'react-router-dom';


class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loginAttribute:{
        email:'',
        password:''
      },
      message: {},
      isLoader: false
    };
    this.loginAction = this.loginAction.bind(this);
  }

  setLoginHandler = (e)=>{
    let copyloginAttribute = {...this.state.loginAttribute};
    copyloginAttribute[e.target.name]=e.target.value;
    this.setState({
      loginAttribute:copyloginAttribute,
      message: { ...this.state.message, [e.target.name]: '' }
    });
  }

  loginAction = () => {
    this.setState({ isLoader: true });
    axios({
      method:"POST",
      url:config.login, 
      data:{
        email:this.state.loginAttribute.email,
        password:this.state.loginAttribute.password
      }
    })
    .then(res => {
      console.log("login_api_success:", res)
      this.props.setMessage({ global_message: res.data.message })
      this.setState({ isLoader: false });
      this.props.login({ ...res.data,
        email:this.state.loginAttribute.email,
        password:this.state.loginAttribute.password,
        isLoggedIn: true,
      })
    }).catch(err=>{
      console.log("login_api_error:", err);
      this.setState({ message: err.response.data.message });
      if (typeof err.response.data.message == 'string') {
        this.props.setMessage({ global_message: err.response.data.message })
      }
      this.setState({ isLoader: false });
    });
  };

  render() {
    const { email, password }=this.state.loginAttribute;
    const { message, isLoader } = this.state;
    const global_message = this.props.global_message || '';

    return (
      <div className="login-bg" id="pwd-container">
        <div id='global-loader' className={isLoader?'':'d-none'}>
          <img src={loader} alt='loader' />
        </div>
        <div className="custompage">
          <Container>
            <div className="login custom-content  mt-0">
              <Row>
                <Col>
                  <img
                    src={require("../assets/images/logo.png")}
                    className="header-brand-img mb-5 mt-2 mt-lg-0 "
                    alt="logo"
                  />
                  <h3 className="text-center">Login to your Account</h3>
                  <Alert color="info" className={global_message ? '' : 'd-none'} id="global_message">{global_message}</Alert>
                  <p>
                    Please Enter the Email address registered on your account
                  </p>

                  <Form>
                    <FormGroup>
                      <Label
                        className="form-label text-left"
                        for="exampleEmail"
                      >
                        Email address
                      </Label>
                      <Input
                        type="email"
                        value={email}
                        name="email"
                        id="exampleEmail"
                        onChange={this.setLoginHandler}
                        placeholder="Enter email"
                      />
                      <p className="login-form-error">{message.email}</p>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-label text-left"
                        for="examplePassword"
                      >
                        Password
                      </Label>
                      <Input
                        onChange={this.setLoginHandler}
                        value={password}
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Password"
                      />
                      <p className="login-form-error">{message.password}</p>
                    </FormGroup>

                    <div className="checkbox text-left mb-2">
                      <div className="custom-checkbox custom-control">
                        <input
                          type="checkbox"
                          data-checkboxes="mygroup"
                          className="custom-control-input"
                          id="checkbox-2"
                        />
                        <label
                          htmlFor="checkbox-2"
                          className="custom-control-label"
                        >
                          Check me Out
                        </label>
                      </div>
                    </div>

                    <div className="text-left">
                      <Button
                        onClick={this.loginAction}
                        type="button"
                        color="primary"
                      >
                        Sign in
                      </Button>{" "}
                      <Button type="button" color="danger">
                        Cancel
                      </Button>
                    </div>
                    <div className="text-left text-muted mt-3">
                      Don't have account yet?{" "}
                      <a href="register">Sign up</a>
                    </div>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.message };
};

const mapDispatchToProps = {
  login: login,
  setMessage: setMessage
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
export default withRouter(Login);
