import React, { Component } from 'react';
import { MenuItem, Navbar, Nav, NavItem, NavDropdown, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router";
import axios from 'axios';
import config from './../config';

class NavemenuRoute extends Component {

    constructor(props,context){
        super(props,context);
        this.logOutHandler = this.logOutHandler.bind(this);
        this.state={
            userId:this.props.userId,
        }
    }

    logOutHandler = () =>{
        this.setState({ userId: false });
        console.log(window.location.hostname);
        //this.props.history.replace('/');
    }

    switchCompany=(id)=>{
        axios({
            method: 'POST',
            withCredentials: true, // default
            url: config.switchCompany,
            data:{company_id:id}             
        })
        .then(res=>{    
           if(res.data == '1'){
            window.location.href = `${window.location.hostname}/admin`;
           }
           /// console.log(res);
                
        })
        .catch(err =>{
            console.log(err);
        })
    }


    render() {
     
        const {firstname,lastname}=this.props.fullName;

        return (
            <div>
                <Navbar className="menuContainer">


                    <Row className="show-grid">
                        <Col xs={6} >
                            <FontAwesomeIcon className="toggleIcon" onClick={this.props.menuToggle} icon={faBars} />
                        </Col>
                        <Col xs={4} mdPush={2}>
                           
                            <Nav className="mainNave">
                               <NavDropdown eventKey={3} className="firstDropdown" title={this.props.company} id="basic-nav-dropdown">

                                    {
                                        [...this.props.comlist].map((item,i)=>{
                                            return <MenuItem onClick={()=>this.switchCompany(item.id)} className={ this.props.company === item.c_name ? 'companyItem active':'companyItem' } key={i} eventKey={3.1}>{item.c_name}</MenuItem>
                                        })
                                    }
                                    <MenuItem className="companyItem" eventKey={3.1}>--- Create New Company --</MenuItem>
                                  
                                </NavDropdown>
                                <NavItem activeKey className="icon_div">                               
                                  {firstname.charAt(0)}{lastname.charAt(0)}
                               
                                </NavItem>
                                <NavDropdown eventKey={3} title={[firstname, lastname].join(' ')} id="basic-nav-dropdown">
                                    <MenuItem className="companyItem" onClick={this.logOutHandler} eventKey={3.1}>Logout</MenuItem>
                                   
                                </NavDropdown>
                            </Nav>
                        </Col>
                    </Row>


                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavemenuRoute);