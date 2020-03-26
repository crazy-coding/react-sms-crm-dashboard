import React, { Component } from "react";
import { connect } from "react-redux";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import '../assets/css/sidemenu-light.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faCode,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { receiveFetchData } from '../actions';
import config from '../config/index';
import axios from 'axios';
import { PerPageOption, SearchOption, Pagination } from './component/TableOptions'
import SendplexModal from './component/SendplexModal'
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import { func } from "prop-types";

class DomainManagement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: [],
      action_select: 'check_dns',
      params: {
        type: 'domains',
        page: 1,
        per_page: '5',
        sort: 'asc',
        order_by: 'id',
        q: '',
        message: {}
      },
      modal: {
        isOpen: false,
        mode: false,
        modalLoader: true,
        values: {},
        modalContent: {
          title: 'Modal',
          type: 'form',
          body: [{
              label: 'Domain Name',
              name: 'domain',
              type: 'input',
              placeholder: '',
              attrs: {}
            }],
            button: {
              className: "",
              color: 'primary',
              text: 'Submit'
            },
            message: {}
          },
      }
    };
  }
  
  toggle = (mode, key) => {
    let modalContent = this.state.modal.modalContent;
    modalContent.button.className = '';
    modalContent.message = {};
    let values = {
      key: key,
      id: 0,
      domain: '',
    };
    let modalLoader = true;
    
    switch (mode) {
      case 'add':
        modalContent.title = 'Add New Campaign';
        modalContent.type = 'form';
        modalContent.button.color = 'primary';
        modalContent.button.text = 'Add';
        modalLoader = false;
        break;
      case 'edit':
        modalContent.title = 'Edit Campaign';
        modalContent.type = 'form';
        modalContent.button.color = 'warning';
        modalContent.button.text = 'Edit';
        modalLoader = false;
        values = { ...values, ...this.props.data.table.data[key] };
        // this.verify_domain_data(values.id);
        break;
      case 'view':
        modalContent.title = 'View Campaign';
        modalContent.type = 'text';
        modalContent.button.className = 'd-none';
        modalContent.button.color = 'primary';
        modalContent.button.text = 'OK';
        modalLoader = false;
        values = { ...values, ...this.props.data.table.data[key] };
        // this.verify_domain_data(values.id);
        break;
      case 'delete':
        modalContent.title = 'Delete this Campaign?';
        modalContent.type = 'text';
        modalContent.button.color = 'danger';
        modalContent.button.text = 'Delete';
        modalLoader = false;
        values = { ...values, ...this.props.data.table.data[key] };
        // this.verify_domain_data(values.id);
        break;
    }

    this.setState((prevState) => ({
      modal: { ...prevState.modal,
        isOpen: !prevState.modal.isOpen,
        mode: mode,
        modalLoader: modalLoader,
        modalContent: modalContent,
        values: {...values}
      }
    }));
  }

  inputHandler = (e) => {
    let values = {...this.state.modal.values};
    values[e.target.name] = e.target.value;
    this.setState((prevState) => ({
      modal: { ...prevState.modal,
        values: {...values}
      }
    }));
  }

  componentWillMount() {
    if (!this.props.data.table) {
      this.fetch_domains_data(this.state.params);
    }
  }

  editHandler = () => {
    console.log('edit', this.state)
    this.setState((prevState) => ({
      modal: { ...prevState.modal,
        modalLoader: true,
      }
    }));
    axios({
      method:"PATCH",
      headers: { 'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` },
      url:config.edit_domain.replace(':id', this.state.modal.values.id),
      data:{
        domain:this.state.modal.values.domain,
      }
    })
    .then(res => {
      console.log("edit_domain_api_success:", res)
      this.props.data.table.data[this.state.modal.values.key] = res.data.data
      this.props.receiveFetchData({
        domains: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data ],
          } 
        }
      });
      toast.notify("Updated domain successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("edit_domain_api_error:", err);
      this.setState((prevState) => ({
        modal: { ...prevState.modal,
          modalLoader: false,
          modalContent: { ...prevState.modal.modalContent,
            message: err.response.data.message
          }
        }
      }));
    });
  }

  viewHandler = () => {
    console.log('view')
    this.toggle();
  }

  deleteHandler = () => {
    console.log('delete', this.state)
    this.setState((prevState) => ({
      modal: { ...prevState.modal,
        modalLoader: true,
      }
    }));
    axios({
      method:"DELETE",
      headers: { 'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` },
      url:config.edit_domain.replace(':id', this.state.modal.values.id),
    })
    .then(res => {
      console.log("delete_domain_api_success:", res)
      this.props.data.table.data.splice(this.state.modal.values.key, 1);
      this.props.receiveFetchData({
        domains: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data ],
          } 
        }
      });
      toast.notify("Deleted domain successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("delete_domain_api_error:", err);
      this.setState((prevState) => ({
        modal: { ...prevState.modal,
          modalLoader: false,
          modalContent: { ...prevState.modal.modalContent,
            message: err.response.data.message
          }
        }
      }));
    });
  }

  addHandler = () => {
    this.setState((prevState) => ({
      modal: { ...prevState.modal,
        modalLoader: true,
      }
    }));
    axios({
      method:"POST",
      headers: { 'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` },
      url:config.domains,
      data:{
        domain:this.state.modal.values.domain,
      }
    })
    .then(res => {
      console.log("add_domain_api_success:", res)
      this.props.receiveFetchData({
        domains: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data, res.data.data ],
          } 
        }
      });
      toast.notify("Added new domain successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("add_domain_api_error:", err);
      this.setState((prevState) => ({
        modal: { ...prevState.modal,
          modalLoader: false,
          modalContent: { ...prevState.modal.modalContent,
            message: err.response.data.message
          }
        }
      }));
    });
  }

  perPageHandler = (e) => {
    let per_page = e.target.value;
    this.setState((prevState) => ({
      params: { ...prevState.params,
        per_page: per_page
      }
    }), () => {
      this.fetch_domains_data(this.state.params);
    });
  }

  searchHandler = (e) => {
    let q = e.target.value;
    this.setState((prevState) => ({
      params: { ...prevState.params,
        q: q
      }
    }), () => {
      this.search_domains_data(this.state.params);
    });
  }

  paginationHandler = (page) => {
    this.setState((prevState) => ({
      params: { ...prevState.params,
        page: page
      }
    }), () => {
      this.search_domains_data(this.state.params);
    });
  }

  fetch_domains_data = (data) => {
    axios({
      method:"GET",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url:config.domains,
      params: data
    })
    .then(res => {
      console.log("domain_table_api_success:", res)
      this.props.receiveFetchData({
        domains: { ...this.props.data,
          table: {...res.data} }
      });
      this.setState((prevState) => ({
        params: { ...prevState.params,
          message: {}
        }
      }));
    }).catch(err=>{
      console.log("domains_table_api_error:", err);
      this.setState((prevState) => ({
        params: { ...prevState.params,
          message: err.response.data.message
        }
      }));
    });
  }

  search_domains_data = (data) => {
    if (data.q) {
      axios({
        method:"GET",
        headers: {
          'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
        },
        url:config.search,
        params: data
      })
      .then(res => {
        console.log("domain_search_api_success:", res)
        this.props.receiveFetchData({
          domains: { ...this.props.data,
            table: {...res.data} }
        });
        this.setState((prevState) => ({
          params: { ...prevState.params,
            message: {}
          }
        }));
      }).catch(err=>{
        console.log("domains_search_api_error:", err);
        this.setState((prevState) => ({
          params: { ...prevState.params,
            message: err.response.data.message
          }
        }));
      });
    } else {
      this.fetch_domains_data(data);
    }
  }

  verify_domain_data = (id) => {
    axios({
      method:"GET",
      headers: { 'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` },
      url:config.verify_domain.replace(':id', id)
    })
    .then(res => {
      console.log("verify_campaign_api_success:", res)
      // toast.notify(res.data.message + ': ' + res.data.data.domain, {position: 'top-right', duration: 2000});
    }).catch(err=>{
      console.log("verify_campaign_api_error:", err);
    });
  }

  confirmAction = () => {
    switch(this.state.modal.mode) {
      case 'add':
        this.addHandler();
        break;
      case 'edit':
        this.editHandler();
        break;
      case 'delete':
        this.deleteHandler();
        break;
    }
  }

  goAction = () => {
    switch(this.state.action_select) {
      case 'check_dns':
        this.state.checked.map((e, i) => {
          this.verify_domain_data(e);
        })
        break;
    }
  }

  checkHandler = (e) => {
    let index = this.state.checked.indexOf(e.target.name);
 
    if (index > -1) {
      this.state.checked.splice(index, 1);
    } else {
      this.state.checked.push(e.target.name)
    }
  }

  actionSelectorHandler = (e) => {
    this.state.action_select = e.target.value
  }

  render() {
    const table = this.props.data.table ? this.props.data.table.data : [];
    const { isOpen, modalLoader, modalContent, values } = this.state.modal;
    const { q, per_page, message } = this.state.params;
    const pagination = this.props.data.table || {};

    const log_badge = {
      'released': 'success',
      'danger': 'danger',
      'primary': 'primary',
      'pending': 'warning',
      'info': 'info',
    }

    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Domain Management</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Campaign</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Domain Management
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card logs-table'>
                <div className='card-header'>
                  <div className='dns btn-group mt-2 mb-2'>
                    <select className='table-select' onChange={this.actionSelectorHandler} value={this.state.action_select}>
                      <option value='larum ipsum'>larum ipsum</option>
                      <option value='check_dns'>Check DNS</option>
                      <option value='larum ipsum'>larum ipsum</option>
                    </select>
                  </div>
                  <div className='go'>
                    <a href='#' onClick={this.goAction} className='btn btn-outline-info'>
                      Go
                    </a>
                  </div>
                  <h4 className='card-title'>Apply to selected domain below</h4>
                  <button type='button' className='btn btn-primary pos-ab add' onClick={() => this.toggle('add')}>
                    <i className='si si-plus mr-2 text-white'></i>Add New Domain
                  </button>
                  <button type='button' className='btn btn-primary pos-ab'>
                    <i className='si si-plus mr-2 text-white'></i>Domain API Setting
                  </button>
                </div>
                <SendplexModal isOpen={isOpen} toggle={this.toggle} className="" values={values}
                  modalLoader={modalLoader} confirmAction={this.confirmAction} 
                  modalContent={modalContent} inputHandler={this.inputHandler} />
                <div className='card-body'>
                  <div className="row">
                    <div className="col-md-6 col-xs-12 mb-4">
                      <PerPageOption onChange={this.perPageHandler} value={per_page} />
                    </div>
                    {/* <div className="col-md-6 col-xs-12">
                      <SearchOption onChange={this.searchHandler} value={q} message={message} />
                    </div> */}
                  </div>
                  <div className='table-responsive '>
                    <table id='example-2' className='table table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th className='wd-15p border-bottom-0'>SELECT</th>
                          <th className='wd-15p border-bottom-0'>DOMAIN NAME</th>
                          <th className='wd-20p border-bottom-0'>STATUS</th>
                          <th className='wd-25p border-bottom-0'>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.map((sItem, k) => 
                          <tr key={k} id={sItem.id}>
                            <td>
                              <label className='colorinput'>
                                <input name={sItem.id} type='checkbox' value='on' onChange={this.checkHandler} className='colorinput-input' />
                                <span className='colorinput-color bg-azure'></span>
                              </label>
                            </td>
                            <td>{sItem.domain}</td>
                            <td><span className={`badge badge-pill badge-${log_badge[sItem.status]}`}>{sItem.status}</span></td>
                            <td>
                              <a href='#' className='mr-3' onClick={() => this.toggle('edit', k)}>
                              <FontAwesomeIcon icon={faPencilAlt} />
                              </a>
                              <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View' onClick={() => this.toggle('view', k)}>
                              <FontAwesomeIcon icon={faCode} />
                              </a>
                              <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete' onClick={() => this.toggle('delete', k)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination option={pagination} onClick={this.paginationHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

const mapStateToProps = state => {
  return { data: state.data.domains,
    auth: state.auth };
};

const mapDispatchToProps = {
  receiveFetchData: receiveFetchData,
};


DomainManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainManagement);

export default DomainManagement;