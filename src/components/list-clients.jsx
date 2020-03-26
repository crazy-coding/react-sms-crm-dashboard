import React, { Component } from "react";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import '../assets/css/sidemenu-light.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faCode,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { receiveFetchData } from '../actions';
import config from '../config/index';
import axios from 'axios';
import SendplexModal from './component/SendplexModal'
import { PerPageOption, SearchOption, Pagination } from './component/TableOptions'
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';

class ListClients extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      params: {
        type: 'list',
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
              label: 'List Name',
              name: 'name',
              type: 'input',
              placeholder: '',
              attrs: {}
            },
            {
              label: 'Status',
              name: 'status',
              type: 'select',
              placeholder: '',
              attrs: {
                options: [{value: 'Active', name: 'Active'}, {value: 'InActive', name: 'InActive'}]
              }
            },
            {
              label: 'Amount',
              name: 'amount',
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
      name: '',
      status: '',
      amount: '',
    };
    let modalLoader = true;
    
    switch (mode) {
      case 'edit':
        modalContent.title = 'Edit List';
        modalContent.type = 'form';
        modalContent.button.color = 'warning';
        modalContent.button.text = 'Edit';
        modalContent.body[modalContent.body.findIndex((obj => obj.name == "name"))].className = "d-block"
        modalContent.body[modalContent.body.findIndex((obj => obj.name == "status"))].className = "d-block"
        modalContent.body[modalContent.body.findIndex((obj => obj.name == "amount"))].className = "d-none"
        modalLoader = false;
        values = { ...values, ...this.props.data.table.data[key] };
        break;
      case 'split':
          modalContent.title = 'Split List';
          modalContent.type = 'form';
          modalContent.button.color = 'warning';
          modalContent.button.text = 'Split';
          modalContent.body[modalContent.body.findIndex((obj => obj.name == "name"))].className = "d-none"
          modalContent.body[modalContent.body.findIndex((obj => obj.name == "status"))].className = "d-none"
          modalContent.body[modalContent.body.findIndex((obj => obj.name == "amount"))].className = "d-block"
          modalLoader = false;
          values = { ...values, ...this.props.data.table.data[key] };
          break;
      case 'delete':
        modalContent.title = 'Delete this List?';
        modalContent.type = 'text';
        modalContent.button.color = 'danger';
        modalContent.button.text = 'Delete';
        modalLoader = false;
        values = { ...values, ...this.props.data.table.data[key] };
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
      this.fetch_lists_data(this.state.params);
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
      url:config.edit_list.replace(':id', this.state.modal.values.id),
      data:{
        name:this.state.modal.values.name,
        status:this.state.modal.values.status == 'Active' ? 'true' : 'false'
      }
    })
    .then(res => {
      console.log("edit_list_api_success:", res)
      this.props.data.table.data[this.state.modal.values.key] = res.data
      this.props.receiveFetchData({
        lists: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data ],
          } 
        }
      });
      toast.notify("Updated list successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("edit_list_api_error:", err);
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

  splitHandler = () => {
    console.log('split', this.state)
    this.setState((prevState) => ({
      modal: { ...prevState.modal,
        modalLoader: true,
      }
    }));
    axios({
      method:"POST",
      headers: { 'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` },
      url:config.split_list.replace(':id', this.state.modal.values.id),
      data:{
        amount:this.state.modal.values.amount,
      }
    })
    .then(res => {
      console.log("split_list_api_success:", res)
      // toast.notify(res.data.message, {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("split_list_api_error:", err);
      // toast.notify(res.data.message, {position: 'top-right', duration: 2000});
      this.toggle();
    });
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
      url:config.edit_list.replace(':id', this.state.modal.values.id),
    })
    .then(res => {
      console.log("delete_list_api_success:", res)
      this.props.data.table.data.splice(this.state.modal.values.key, 1);
      this.props.receiveFetchData({
        lists: { ...this.props.data,
          table: { ...this.props.data.table,
            data: [ ...this.props.data.table.data ],
          } 
        }
      });
      toast.notify("Deleted list successfully.", {position: 'top-right', duration: 2000});
      this.toggle();

    }).catch(err=>{
      console.log("delete_list_api_error:", err);
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
      this.fetch_lists_data(this.state.params);
    });
  }

  searchHandler = (e) => {
    let q = e.target.value;
    this.setState((prevState) => ({
      params: { ...prevState.params,
        q: q
      }
    }), () => {
      this.search_lists_data(this.state.params);
    });
  }

  paginationHandler = (page) => {
    this.setState((prevState) => ({
      params: { ...prevState.params,
        page: page
      }
    }), () => {
      this.search_lists_data(this.state.params);
    });
  }

  fetch_lists_data = (data) => {
    axios({
      method:"GET",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url:config.lists,
      params: data
    })
    .then(res => {
      console.log("list_table_api_success:", res)
      this.props.receiveFetchData({
        lists: { ...this.props.data,
          table: res.data }
      });
      this.setState((prevState) => ({
        params: { ...prevState.params,
          message: {}
        }
      }));
    }).catch(err=>{
      console.log("lists_table_api_error:", err);
      this.setState((prevState) => ({
        params: { ...prevState.params,
          message: err.response.data.message
        }
      }));
    });
  }

  search_lists_data = (data) => {
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
        console.log("list_search_api_success:", res)
        this.props.receiveFetchData({
          lists: { ...this.props.data,
            table: res.data }
        });
        this.setState((prevState) => ({
          params: { ...prevState.params,
            message: {}
          }
        }));
      }).catch(err=>{
        console.log("lists_search_api_error:", err);
        this.setState((prevState) => ({
          params: { ...prevState.params,
            message: err.response.data.message
          }
        }));
      });
    } else {
      this.fetch_lists_data(data);
    }
  }

  confirmAction = () => {
    switch(this.state.modal.mode) {
      case 'edit':
        this.editHandler();
        break;
      case 'split':
        this.splitHandler();
        break;
      case 'delete':
        this.deleteHandler();
        break;
    }
  }

  render() {
    const table = this.props.data.table ? this.props.data.table.data : [];
    const { isOpen, modalLoader, modalContent, values } = this.state.modal;
    const { q, per_page, message } = this.state.params;
    const pagination = this.props.data.table || {};

    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>List Management</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>List</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                List Management
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card logs-table'>
                <div className='card-header second-head'>
                  <h4 className='card-title'>List's count and status is updated every 15 minutes or you can click Verify to check instantly. We only display list from the last 7 days by default.</h4>
                  <button type='button' className='btn btn-primary pos-ab'>
                    <i className='fa fa-search mr-2 text-white'></i>Bulk Verify
                  </button>
                </div>
                <div className='card-header'>
                  <div className='dns btn-group mt-2 mb-2'>
                    <select className='table-select'>
                      <option value='volvo'>Action</option>
                      <option value='larum ipsum'>Another action</option>
                      <option value='larum ipsum'>larum ipsum</option>
                    </select>
                  </div>
                  <div className='go'>
                    <a href='#' className='btn btn-outline-info'>
                      Go
                    </a>
                  </div>
                  <h4 className='card-title'>Apply to selected domain below</h4>
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
                          <th className='wd-5p border-bottom-0'>SELECT</th>
                          <th className='wd-10p border-bottom-0'>ID</th>
                          <th className='wd-25p border-bottom-0'>LIST NAME</th>
                          <th className='wd-20p border-bottom-0'>STATUS</th>
                          <th className='wd-20p border-bottom-0'>TOTAL</th>
                          <th className='wd-20p border-bottom-0'>WIRELESS</th>
                          <th className='wd-20p border-bottom-0'>LANDLINE AND VOIP</th>
                          <th className='wd-20p border-bottom-0'>UNIDENTIFIED</th>
                          <th className='wd-20p border-bottom-0'>CREATED DATE</th>
                          <th className='wd-25p border-bottom-0'>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.map((sItem, k) => 
                          <tr key={k} id={sItem.id}>
                            <td>
                              <label className='colorinput'>
                                <input name='color' type='checkbox' value='azure' className='colorinput-input' key={k} />
                                <span className='colorinput-color bg-azure'></span>
                              </label>
                            </td>
                            <td>{sItem.id}</td>
                            <td>{sItem.name}</td>
                            <td><span className='badge badge-pill badge-warning'>{sItem.status}</span></td>
                            <td>100(?)</td>
                            <td>654,765(?)</td>
                            <td>4,000(?)</td>
                            <td>$484,000.00(?)</td>
                            <td>{sItem.created_at}</td>
                            <td>
                              <a href='#' className='mr-3' data-toggle='tooltip' title='Edit' data-original-title='View' onClick={() => this.toggle('edit', k)}>
                              <FontAwesomeIcon icon={faPencilAlt} />
                              </a>
                              <a href='#' className='mr-3' data-toggle='tooltip' title='Split' data-original-title='Split' onClick={() => this.toggle('split', k)}>
                              <FontAwesomeIcon icon={faPencilAlt} />
                              </a>
                              <a href={`/list-clients/${sItem.id}`} className='mr-3' data-toggle='tooltip' title='View clients of list' data-original-title='View Clients'>
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
  return { data: state.data.lists,
    auth: state.auth };
};

const mapDispatchToProps = {
  receiveFetchData: receiveFetchData,
};

ListClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListClients);

export default ListClients;