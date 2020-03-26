import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";

class ModalUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Campaign Management</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Campaign</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Campaign Management
              </li>
            </ol>
          </div>
          <Row>
            <div className='col-md-12 col-lg-4 col-xl-4'>
              <div className='card'>
                <div className='card-header'>
                  <h3 className='card-title'>Basic Modal</h3>
                </div>
                <div className='card-body text-center'>
                  <Button color='primary' onClick={this.toggle}>
                  Basic Modal
                  </Button>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' onClick={this.toggle}>
                        Do Something
                      </Button>{" "}
                      <Button color='primary' onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default ModalUI;
