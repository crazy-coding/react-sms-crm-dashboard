import React, { Component } from "react";
import { connect } from "react-redux";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import '../assets/css/sidemenu-light.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faCode,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'reactstrap';
import Datatable from 'react-bs-datatable';
import moment from 'moment';
import { fetch_domains_data } from '../actions';

class DomainManagement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetch_domains_data();
  }

  viewHandler = (e, domain_id) => {
    console.log(e, domain_id)
  }

  deleteHandler = (e, domain_id) => {
    console.log(e, domain_id)
  }

  render() {
    const domains_data = this.props.data.domains_data || [];

    const header = [
      { title: 'Select', prop: 'check', sortable: true },
      { title: 'Domain Name', prop: 'domain_name', sortable: true, filterable: true },
      { title: 'Status', prop: 'status', sortable: true, filterable: true },
      { title: 'Action', prop: 'action' },
    ];

    const body = [];
    domains_data.map((sItem, k) => body.push({
      check: <label className='colorinput'>
          <input name='color' type='checkbox' value='azure' className='colorinput-input' />
          <span className='colorinput-color bg-azure'></span>
        </label>,
      domain_name: sItem.domain_name,
      status: <span className='badge badge-pill badge-warning {sItem.status}'>{sItem.status}</span>,
      action: <div>
          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View' onClick={e => this.viewHandler(e, sItem.id)}>
            <FontAwesomeIcon icon={faCode} />
          </a>
          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete' onClick={e => this.deleteHandler(e, sItem.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </a>
        </div>,
    }));
    
    const onSortFunction = {
      date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, 'Do MMMM YYYY').valueOf();
      },
    };

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
                    <select className='table-select'>
                      <option value='volvo'>Check DNS</option>
                      <option value='larum ipsum'>larum ipsum</option>
                      <option value='larum ipsum'>larum ipsum</option>
                    </select>
                  </div>
                  <div className='go'>
                    <a href='#' className='btn btn-outline-info'>
                      Go
                    </a>
                  </div>
                  <h4 className='card-title'>Apply to selected domain below</h4>
                  <button type='button' className='btn btn-primary pos-ab add'>
                    <i className='si si-plus mr-2 text-white'></i>Add New Domain
                  </button>
                  <button type='button' className='btn btn-primary pos-ab'>
                    <i className='si si-plus mr-2 text-white'></i>Domain API Setting
                  </button>
                </div>
                <div className='card-body'>
                  <Datatable
                    className="datatable"
                    tableHeader={header}
                    tableBody={body}
                    keyName="campain_table"
                    tableClass="table-striped table-bordered"
                    rowsPerPage={5}
                    rowsPerPageOption={[5, 10, 15, 20]}
                    initialSort={{prop: "domain_name", isAscending: true}}
                    onSort={onSortFunction}
                  />
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
                        <tr>
                          <td>
                            <label className='colorinput'>
                              <input name='color' type='checkbox' value='azure' className='colorinput-input' />
                              <span className='colorinput-color bg-azure'></span>
                            </label>
                          </td>
                          <td>abcxyz.com</td>
                          <td>
                            <span className='badge badge-pill badge-warning'>Normal</span>
                          </td>
                          <td>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View'>
                            <FontAwesomeIcon icon={faCode} />
                            </a>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete'>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='colorinput'>
                              <input name='color' type='checkbox' value='azure' className='colorinput-input' readOnly checked={true} />
                              <span className='colorinput-color bg-azure'></span>
                            </label>
                          </td>
                          <td>sendplex.com</td>
                          <td>
                            <span className='badge badge-pill badge-danger'>Hold</span>
                          </td>
                          <td>
                          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View'>
                          <FontAwesomeIcon icon={faCode} />
                          </a>
                          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete'>
                          <FontAwesomeIcon icon={faTrashAlt} />
                          </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='colorinput'>
                              <input name='color' type='checkbox' value='azure' className='colorinput-input' />
                              <span className='colorinput-color bg-azure'></span>
                            </label>
                          </td>
                          <td>database.com</td>
                          <td>
                            <span className='badge badge-pill badge-info'>Success</span>
                          </td>
                          <td>
                          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View'>
                          <FontAwesomeIcon icon={faCode} />
                          </a>
                          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete'>
                          <FontAwesomeIcon icon={faTrashAlt} />
                          </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label className='colorinput'>
                              <input name='color' type='checkbox' value='azure' className='colorinput-input' />
                              <span className='colorinput-color bg-azure'></span>
                            </label>
                          </td>
                          <td>pqr.com</td>
                          <td>
                            <span className='badge badge-pill badge-primary'>Rare</span>
                          </td>
                          <td>
                          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View'>
                          <FontAwesomeIcon icon={faCode} />
                          </a>
                          <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete'>
                          <FontAwesomeIcon icon={faTrashAlt} />
                          </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
  return { data: state.data.domains };
};

const mapDispatchToProps = {
  fetch_domains_data: fetch_domains_data,
};

DomainManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainManagement);

export default DomainManagement;