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
import SendplexModal from './component/SendplexModal'
import { PerPageOption, SearchOption, Pagination } from './component/TableOptions'
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';


class TemplateManagement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      params: {
        type: 'template',
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
              label: 'Template Name',
              name: 'name',
              type: 'input',
              placeholder: '',
              attrs: {}
            },
            {
              label: 'Content',
              name: 'content',
              type: 'input',
              placeholder: '',
              attrs: {}
            },
            {
              label: 'Campagin',
              name: 'campaign_id',
              type: 'select',
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
      name: '',
      advertiser: '',
      payout: '',
      url: '',
    };
    let modalLoader = true;
    
    switch (mode) {
      case 'add':
        modalContent.title = 'Add New Template';
        modalContent.type = 'form';
        modalContent.button.color = 'primary';
        modalContent.button.text = 'Add';
        modalLoader = false;
        break;
      case 'edit':
        modalContent.title = 'Edit Template';
        modalContent.type = 'form';
        modalContent.button.color = 'warning';
        modalContent.button.text = 'Edit';
        modalLoader = false;
        values = { ...values, ...this.props.data.table.data[key] };
        // this.stats_template_data(values.id);
        break;
      case 'view':
        modalContent.title = 'View Template';
        modalContent.type = 'text';
        modalContent.button.className = 'd-none';
        modalContent.button.color = 'primary';
        modalContent.button.text = 'OK';
        modalLoader = true;
        values = { ...values, ...this.props.data.table.data[key] };
        this.stats_template_data(values.id);
        break;
      case 'delete':
        modalContent.title = 'Delete this Template?';
        modalContent.type = 'text';
        modalContent.button.color = 'danger';
        modalContent.button.text = 'Delete';
        modalLoader = false;
        values = { ...values, ...this.props.data.table.data[key] };
        // this.stats_template_data(values.id);
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
      this.fetch_templates_data(this.state.params);
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
      url:config.edit_template.replace(':id', this.state.modal.values.id),
      data:{
        name:this.state.modal.values.name,
        content:this.state.modal.values.content,
        campaign_id:this.state.modal.values.campaign_id
      }
    })
    .then(res => {
      console.log("edit_template_api_success:", res)
      this.props.data.table.data[this.state.modal.values.key] = res.data
      this.props.receiveFetchData({
        templates: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data ],
          } 
        }
      });
      toast.notify("Updated template successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("edit_template_api_error:", err);
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
      url:config.edit_template.replace(':id', this.state.modal.values.id),
    })
    .then(res => {
      console.log("delete_template_api_success:", res)
      this.props.data.table.data.splice(this.state.modal.values.key, 1);
      this.props.receiveFetchData({
        templates: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data ],
          } 
        }
      });
      toast.notify("Deleted template successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("delete_template_api_error:", err);
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
      url:config.templates,
      data:{
        name:this.state.modal.values.name,
        content:this.state.modal.values.content,
        campaign_id:this.state.modal.values.campaign_id
      }
    })
    .then(res => {
      console.log("add_template_api_success:", res)
      this.props.receiveFetchData({
        templates: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data, res.data],
          } 
        }
      });
      toast.notify("Added new template successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("add_template_api_error:", err);
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
      this.fetch_templates_data(this.state.params);
    });
  }

  searchHandler = (e) => {
    let q = e.target.value;
    this.setState((prevState) => ({
      params: { ...prevState.params,
        q: q
      }
    }), () => {
      this.search_templates_data(this.state.params);
    });
  }

  paginationHandler = (page) => {
    this.setState((prevState) => ({
      params: { ...prevState.params,
        page: page
      }
    }), () => {
      this.search_templates_data(this.state.params);
    });
  }

  fetch_templates_data = (data) => {
    axios({
      method:"GET",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url:config.templates,
      params: data
    })
    .then(res => {
      console.log("template_table_api_success:", res)
      this.props.receiveFetchData({
        templates: { ...this.props.data,
          table: res.data }
      });
      this.setState((prevState) => ({
        params: { ...prevState.params,
          message: {}
        }
      }));
    }).catch(err=>{
      console.log("templates_table_api_error:", err);
      this.setState((prevState) => ({
        params: { ...prevState.params,
          message: err.response.data.message
        }
      }));
      // this.props.receiveFetchData({
      //   templates: { ...this.props.data,
      //     templates_data: [
      //       {
      //         id: '01',
      //         name: 'Offer 1',
      //         network: 'Google',
      //         conversion: '100',
      //         total_sms: '654,765',
      //         dlr: '4,000',
      //         gross: '484,000',
      //         cost: '2,000',
      //         net: '78,000'
      //       },
      //     ]
      //   }
      // });
    });
  }

  search_templates_data = (data) => {
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
        console.log("template_search_api_success:", res)
        this.props.receiveFetchData({
          templates: { ...this.props.data,
            table: res.data }
        });
        this.setState((prevState) => ({
          params: { ...prevState.params,
            message: {}
          }
        }));
      }).catch(err=>{
        console.log("templates_search_api_error:", err);
        this.setState((prevState) => ({
          params: { ...prevState.params,
            message: err.response.data.message
          }
        }));
      });
    } else {
      this.fetch_templates_data(data);
    }
  }

  stats_template_data = (id) => {
    axios({
      method:"GET",
      headers: { 'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` },
      url:config.stats_template.replace(':id', id)
    })
    .then(res => {
      console.log("stats_template_api_success:", res)
      this.setState((prevState) => ({
        modal: { ...prevState.modal,
          modalLoader: false,
          values: {...prevState.modal.values,
            ...res.data}
        }
      }));
    }).catch(err=>{
      console.log("stats_template_api_error:", err);
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

  render() {
    const table = this.props.data.table ? this.props.data.table : [];
    const { isOpen, modalLoader, modalContent, values } = this.state.modal;
    const { q, per_page, message } = this.state.params;
    const pagination = this.props.data.table || {};

    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Template Management</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Template</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Template Management
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card logs-table'>
                <div className='card-header'>
                  <h4 className='card-title'>You can manage all of your template here</h4>
                  <button type='button' className='btn btn-primary pos-ab' onClick={() => this.toggle('add')}>
                    <i className='si si-plus mr-2 text-white'></i>Add New Template
                  </button>
                </div>
                <SendplexModal isOpen={isOpen} toggle={this.toggle} className="" values={values}
                  modalLoader={modalLoader} confirmAction={this.confirmAction} 
                  modalContent={modalContent} inputHandler={this.inputHandler} />
                <div className='card-body'>
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <PerPageOption onChange={this.perPageHandler} value={per_page} />
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <SearchOption onChange={this.searchHandler} value={q} message={message} />
                    </div>
                  </div>
                  <div className='table-responsive '>
                    <table id='example-2' className='table table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th className='wd-15p border-bottom-0'>ID</th>
                          <th className='wd-15p border-bottom-0'>NAME</th>
                          <th className='wd-20p border-bottom-0'>NETWORK</th>
                          <th className='wd-15p border-bottom-0'>CONVERSION</th>
                          <th className='wd-10p border-bottom-0'>TOTAL SMS</th>
                          <th className='wd-25p border-bottom-0'>DLR</th>
                          <th className='wd-25p border-bottom-0'>GROSS</th>
                          <th className='wd-25p border-bottom-0'>COST</th>
                          <th className='wd-25p border-bottom-0'>NET</th>
                          <th className='wd-25p border-bottom-0'>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.map((sItem, k) => 
                          <tr key={k} id={sItem.id}>
                            <td>{sItem.id}</td>
                            <td>{sItem.name}</td>
                            <td>{sItem.advertiser}</td>
                            <td>100(?)</td>
                            <td>654,765(?)</td>
                            <td>4,000(?)</td>
                            <td>$484,000.00(?)</td>
                            <td>$2000(?)</td>
                            <td>$78,000(?)</td>
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
  return { data: state.data.templates,
    auth: state.auth };
};

const mapDispatchToProps = {
  receiveFetchData: receiveFetchData,
};

TemplateManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateManagement);

export default TemplateManagement;