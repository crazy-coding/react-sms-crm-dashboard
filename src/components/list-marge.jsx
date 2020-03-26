import React, { Component } from "react";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import '../assets/css/sidemenu-light.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faCode, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'reactstrap';
import { connect } from "react-redux";
import { receiveFetchData } from '../actions';
import config from '../config/index';
import axios from 'axios';
import { PerPageOption, SearchOption, Pagination } from './component/TableOptions'

class ListMarge extends Component {
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
      addAttributes: {
        lists: '',
        name: '',
      },
      rows: '',
      selected: {},
      message: {},
      isLoader: false
    };
  }


  perPageHandler = (e) => {
    let per_page = e.target.value;
    this.setState((prevState) => ({
      params: {
        ...prevState.params,
        per_page: per_page
      }
    }), () => {
      this.fetch_lists_data(this.state.params);
    });
  }

  searchHandler = (e) => {
    let q = e.target.value;
    this.setState((prevState) => ({
      params: {
        ...prevState.params,
        q: q
      }
    }), () => {
      this.search_lists_data(this.state.params);
    });
  }

  paginationHandler = (page) => {
    this.setState((prevState) => ({
      params: {
        ...prevState.params,
        page: page
      }
    }), () => {
      this.search_lists_data(this.state.params);
    });
  }

  fetch_lists_data = (data) => {
    axios({
      method: "GET",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url: config.lists,
      params: data
    })
      .then(res => {
        console.log("list_table_api_success:", res)
        this.props.receiveFetchData({
          lists: {
            ...this.props.data,
            table: res.data
          }
        });
        this.setState((prevState) => ({
          params: {
            ...prevState.params,
            message: {}
          }
        }));
      }).catch(err => {
        console.log("lists_table_api_error:", err);
        this.setState((prevState) => ({
          params: {
            ...prevState.params,
            message: err.response.data.message
          }
        }));
      });
  }
  // listsChange = selectedOption => {
  //   var lists = selectedOption.map(({ value }) => value).join(',');
  //   this.setState((prevState) => ({ ...prevState,
  //     form: { ...prevState.form,
  //       lists: lists
  //     }
  //   }));
  // }

  search_lists_data = (data) => {
    if (data.q) {
      axios({
        method: "GET",
        headers: {
          'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
        },
        url: config.search,
        params: data
      })
        .then(res => {
          console.log("list_search_api_success:", res)
          this.props.receiveFetchData({
            lists: {
              ...this.props.data,
              table: res.data
            }
          });
          this.setState((prevState) => ({
            params: {
              ...prevState.params,
              message: {}
            }
          }));
        }).catch(err => {
          console.log("lists_search_api_error:", err);
          this.setState((prevState) => ({
            params: {
              ...prevState.params,
              message: err.response.data.message
            }
          }));
        });
    } else {
      this.fetch_lists_data(data);
    }
  }
  componentWillMount() {
    if (!this.props.data.table) {
      this.fetch_lists_data(this.state.params);
    }
  }
  // setAddHandler = (e) => {
  //   let copyAddAttributes = { ...this.state.addAttributes };
  //   copyAddAttributes[e.target.name] = e.target.value;
  //   if (e.target.name == 'lists') {
  //     var options = e.target.options;
  //     var value = ""
  //     value = options[1].value;
  //     for (var i = 2, l = options.length; i < l; i++) {
  //       if (options[i].selected) {
  //         value = value + "," + options[i].value;
  //       }
  //     }
  //     copyAddAttributes[e.target.name] = value;

  //   }
  //   this.setState({
  //     addAttributes: copyAddAttributes,
  //     //message: { ...this.state.message, [e.target.name]: '' }
  //   });
  // }
  handleSelect = (e) => {
    const selected = this.state.selected;
    selected[e.target.name] = e.target.checked;
    this.setState({ selected });
    var value = '';
    var i = 0;
    Object.keys(selected).map((key, index) => {
      if (selected[key]) {
        i++;
        if (i === 1) {
          value = key;
        } else {
          value = value + ',' + key;
        }
      }
    });
    this.setState((prevState) => ({ ...prevState,
      addAttributes: { ...prevState.addAttributes,
        lists: value
      }
    }));
    // console.log("Lists", this.state.lists)
  }

  addAction = () => {
    // event.preventDefault();
    console.log("Testing if data is sumitted Properly", this.state.addAttributes);
    axios({
      method: "POST",
      headers: { 
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}` ,
      'Content-Type': 'application/json'
    },
      url: config.list_merge,
      data: {
        ...this.state.addAttributes
      }
    })
      .then(res => {
        console.log("list_merge_api_success:", res)
        this.props.setMessage({
          global_message: res.data.message
        })
        this.setState({ isLoader: false });
        window.location.reload();
      }).catch(err => {
        console.log("list_merge_api_error:", err.response);
        this.setState({
          message: err.response.data.message
        });
        this.setState({ isLoader: false });
      });
  };

  setAddHandler = (e) => {
    let copyAddAttributes = { ...this.state.addAttributes };
    copyAddAttributes[e.target.name] = e.target.value;
    this.setState({
      addAttributes: copyAddAttributes,
    });
  }

  render() {
    const table = this.props.data.table ? this.props.data.table.data : [];
    const { name } = this.state.addAttributes;
    const { q, per_page, message } = this.state.params;
    const pagination = this.props.data.table || {};
    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>List Merge</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>List</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                List Merge
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card logs-table'>
                <div className='card-header'>
                  <h4 className='card-title'>
                    Please select the lists and enter the new list name, <br />* Please note, all of the data from the old lists will be transfered to the new list.
                  </h4>
                </div>
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
                          {/* <th className='wd-20p border-bottom-0'>STATUS</th> */}
                          <th className='wd-20p border-bottom-0'>TOTAL</th>
                          {/* <th className='wd-20p border-bottom-0'>WIRELESS</th>
                          <th className='wd-20p border-bottom-0'>LANDLINE AND VOIP</th>
                          <th className='wd-20p border-bottom-0'>UNIDENTIFIED</th> */}
                          <th className='wd-20p border-bottom-0'>CREATED DATE</th>
                          {/* <th className='wd-25p border-bottom-0'>ACTION</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {table.map((sItem, k) =>
                          <tr key={k} id={sItem.id}>
                            <td>
                              <label className='colorinput'>
                                <input name={sItem.id} type='checkbox' selected={this.state.selected[sItem.id]} onChange={(e) => this.handleSelect(e)} className='colorinput-input' key={k} />
                                <span className='colorinput-color bg-azure'></span>
                              </label>
                            </td>
                            <td>{sItem.id}</td>
                            <td>{sItem.name}</td>
                            {/* <td><span className='badge badge-pill badge-warning'>{sItem.status}</span></td> */}
                            <td>{sItem.total}</td>
                            {/* <td>654,765(?)</td>
                            <td>4,000(?)</td>
                            <td>$484,000.00(?)</td> */}
                            <td>{sItem.created_at}</td>
                            {/* <td>
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
                            </td> */}
                          </tr>
                        )}
                      </tbody>
                    </table>

                  </div>
                  <Pagination option={pagination} onClick={this.paginationHandler} />
                  <div className="merge">
                    <p>Name of new list</p>
                    <div className="record">
                      <div className="amount">
                        <i className="si si-layers" data-toggle="tooltip" title="" data-original-title="si-layers"></i>
                        <input type="text" className="form-control input"  name='name' value={name} onChange={this.setAddHandler}  />
                        <button type="button" className="btn btn-primary" onClick={this.addAction}><i className="si si-plus mr-2 text-white"></i>Submit</button>
                      </div>
                    </div>
                  </div>
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
  return {
    data: state.data.lists,
    auth: state.auth
  };
};

const mapDispatchToProps = {
  receiveFetchData: receiveFetchData,
};

ListMarge = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMarge);

export default ListMarge;