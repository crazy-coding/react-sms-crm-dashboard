import React, { Component } from "react";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import '../assets/css/sidemenu-light.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faCode,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'reactstrap';

class PhoneNumber extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Outbound Phone Numbers</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Home</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Numbers
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card logs-table'>
                <div className='card-header'>
                  <h4 className='card-title'>
                    You can buy more numbers by selecting one of the options below. <br />
                    Your card on file will be charged automatically. Numbers expire in 30 days regardless of usage.
                  </h4>
                </div>

                <div className='account-form order-section'>
                  <div className='custom-controls-stacked'>
                    <label className='custom-control custom-radio'>
                      <input type='radio' className='custom-control-input' readOnly name='example-radios' value='option1' checked='' />
                      <span className='custom-control-label'>10 numbers for $15 ($1.5 each)</span>
                    </label>
                    <label className='custom-control custom-radio'>
                      <input type='radio' className='custom-control-input' name='example-radios' value='option2' />
                      <span className='custom-control-label'>20 numbers for $23 ($1.15 each)</span>
                    </label>
                    <label className='custom-control custom-radio'>
                      <input type='radio' className='custom-control-input' name='example-radios' value='option3' />
                      <span className='custom-control-label'>30 numbers for $30 ($1 each)</span>
                    </label>
                    <label className='custom-control custom-radio'>
                      <input type='radio' className='custom-control-input' name='example-radios' value='option3' />
                      <span className='custom-control-label'>40 numbers for $20 ($0.5 each)</span>
                    </label>

                    <div className='form-group'>
                      <label className='form-label'>Promo Code</label>
                      <div className='form-wrap'>
                        <input type='text' className='form-control' name='example-text-input' />
                      </div>
                    </div>
                    <div className='number-btn'>
                      <button type='button' className='btn btn-warning mr-3'>
                        <i className='si si-basket mr-2 text-white'></i>Submit
                      </button>
                    </div>
                  </div>
                </div>

                <div className='card-body'>
                  <div className='table-responsive number-tabel'>
                    <table id='example-2' className='table table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th className='wd-15p border-bottom-0'>POOL ID</th>
                          <th className='wd-15p border-bottom-0'>POOL NAME</th>
                          <th className='wd-20p border-bottom-0'>POOL STATUS</th>
                          <th className='wd-25p border-bottom-0'>TODAY'S VALUE</th>
                          <th className='wd-25p border-bottom-0'>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
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

export default PhoneNumber;