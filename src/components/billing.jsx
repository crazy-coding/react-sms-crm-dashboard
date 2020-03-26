import React, { Component } from "react";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';

import '../assets/css/sidemenu-light.css';



class Billing extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Billing</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Account</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Billing
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card account-form logs-table billing'>
                <div className='card-header'>
                  <h4 className='card-title'>
                    You can topup by entering the amount of credit you would like to buy. <br />
                    You payment source on file will be charged.
                  </h4>
                </div>
                <div className='bill-wrap'>
                  <div className='form-group'>
                    <label className='form-label'>Topup Amount</label>
                    <div className='form-wrap'>
                      <input type='text' className='form-control' name='example-text-input' />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Promo Code</label>
                    <div className='form-wrap'>
                      <input type='text' className='form-control' name='example-text-input' />
                    </div>
                  </div>

                  <div className='account-btn'>
                    <button type='button' className='btn btn-warning mr-3'>
                      <i className='si si-basket mr-2 text-white'></i>Order
                    </button>
                  </div>
                </div>

                <div className='card-wrap'>
                  <button type='button' className='btn btn-danger mr-2'>
                    <i className='si si-credit-card mr-2 text-white'></i>Credit Transfer
                  </button>
                  <button type='button' className='btn btn-danger'>
                    <i className='si si-credit-card mr-2 text-white'></i>Payment Transfer
                  </button>
                </div>

                <div className='card-body'>
                  <div className='table-responsive '>
                    <table id='example-2' className='table table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th className='wd-15p border-bottom-0'>DATE</th>
                          <th className='wd-15p border-bottom-0'>INVOICE NUMBER</th>
                          <th className='wd-15p border-bottom-0'>AMOUNT</th>
                          <th className='wd-20p border-bottom-0'>STATUS</th>
                          <th className='wd-25p border-bottom-0'>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2014/04/21</td>
                          <td>1234</td>
                          <td>54,000</td>
                          <td>
                            <span className='badge badge-pill badge-danger'>Decline</span>
                          </td>
                          <td>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View'>
                              <i className='fa fa-edit text-dark fs-16'></i>
                            </a>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete'>
                              <i className='fa fa-trash text-dark fs-16'></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>2014/04/21</td>
                          <td>345</td>
                          <td>1,54,675</td>
                          <td>
                            <span className='badge badge-pill badge-warning'>Hold</span>
                          </td>
                          <td>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View'>
                              <i className='fa fa-edit text-dark fs-16'></i>
                            </a>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete'>
                              <i className='fa fa-trash text-dark fs-16'></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>2014/04/21</td>
                          <td>4567</td>
                          <td>4355</td>
                          <td>
                            <span className='badge badge-pill badge-info'>Success</span>
                          </td>
                          <td>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='View'>
                              <i className='fa fa-edit text-dark fs-16'></i>
                            </a>
                            <a href='#' className='mr-3' data-toggle='tooltip' title='' data-original-title='Delete'>
                              <i className='fa fa-trash text-dark fs-16'></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='col-sm-12 col-md-6 data-btn'>
                      <div className='dt-buttons btn-group'>
                        <button className='btn buttons-copy mr-2' tabIndex='0' aria-controls='example' type='button'>
                          <span>Copy</span>
                        </button>
                        <button className='btn buttons-copy mr-2' tabIndex='0' aria-controls='example' type='button'>
                          <span>CSV</span>
                        </button>
                        <button className='btn buttons-excel mr-2' tabIndex='0' aria-controls='example' type='button'>
                          <span>Excel</span>
                        </button>
                        <button className='btn buttons-pdf mr-2' tabIndex='0' aria-controls='example' type='button'>
                          <span>PDF</span>
                        </button>
                        <button className='btn buttons-print'  tabIndex='0' aria-controls='example' type='button'>
                          <span>Print</span>
                        </button>
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


export default Billing;

