import React, { Component } from 'react';
import { connect } from "react-redux";
import {Line} from 'react-chartjs-2';

import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';

import '../assets/css/sidemenu-light.css';
// import { stat } from 'fs';
import { receiveFetchData } from '../actions'
import axios from 'axios';
import config from '../config/index';


class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillMount() {
    this.fetch_dashboard_data()
    this.fetch_top_offer_data()
    const sales_cart_days = this.props.data.sales_cart_days || '30';
    this.fetch_live_logs_data()
    this.fetch_sales_cart_data(sales_cart_days)
  }

  saleCartHandler = (e) => {
    this.fetch_sales_cart_data(e.target.value)
  }

  fetch_dashboard_data = () => {
    axios({
      method:"GET",
      url:config.stats_campaigns, 
      headers: {
        "Authorization" : this.props.auth.token_type + " " + this.props.auth.access_token
      }
    })
    .then(res => {
      console.log("dashboard_operation_api_success:", res)
      this.props.receiveFetchData({
        dashboard: { ...this.props.data, ...res.data }
      });
    }).catch(err=>{
      console.log("dashboard_operation_api_error:", err);
    });
  };
  
  fetch_top_offer_data = () => {
    axios({
      method:"GET",
      url:config.top_offer, 
      headers: {
        "Authorization" : this.props.auth.token_type + " " + this.props.auth.access_token
      }
    })
    .then(res => {
      console.log("dashboard_top_offer_api_success:", res)
      var top_offers ={
        offer1: { title: 'First Place', text: res.data[0].name },
        offer2: { title: 'Second Place', text: res.data[1].name },
        offer3: { title: 'Third Place', text: res.data[2].name },
        offer4: { title: 'Fourth Place', text: res.data[3].name },
        offer5: { title: 'Fifth Place', text: res.data[4].name },
      }
      this.props.receiveFetchData({
        dashboard: { ...this.props.data, ...top_offers}
      });
    }).catch(err=>{
      console.log("dashboard_top_offer_api_error:", err);
    });
  };

  fetch_sales_cart_data = (days) => {
    axios({
      method:"GET",
      url:config.sales_cart, 
      headers: {
        "Authorization" : this.props.auth.token_type + " " + this.props.auth.access_token
      },
      params:{
        last_days: days
      }
    })
    .then(res => {
      console.log("sales_cart_api_success:", res)
      var obj = res.data;
      var new_obj = Object.keys(obj).sort().reduce((r, k) => (r[k] = obj[k], r), {});

      this.props.receiveFetchData({
        dashboard: { ...this.props.data, sales_cart_days: days, sales_cart_data: {
          labels: Object.keys(new_obj),
          total: Object.values(Object.keys(new_obj).reduce((r, k) => (r[k] = new_obj[k].total, r), {})),
          undelivered: Object.values(Object.keys(new_obj).reduce((r, k) => (r[k] = new_obj[k].undelivered, r), {})),
          delivered: Object.values(Object.keys(new_obj).reduce((r, k) => (r[k] = new_obj[k].delivered, r), {})),
        } }
      });
    }).catch(err=>{
      console.log("sales_cart_api_error:", err);
    });
  }

  fetch_live_logs_data = () => {
    axios({
      method:"GET",
      url:config.live_logs, 
      headers: {
        "Authorization" : this.props.auth.token_type + " " + this.props.auth.access_token
      }
    })
    .then(res => {
      console.log("live_logs_api_success:", res)
      this.props.receiveFetchData({
        dashboard: { ...this.props.data, live_sending_logs: res.data}
      });
    }).catch(err=>{
      console.log("live_logs_api_error:", err);
    });
  };

  render() {
    const { att, verizon, tmobile, sprint, 
      offer1, offer2, offer3, offer4, offer5, sales_cart_days } = this.props.data;

    const log_badge = {
      'delivered': 'success',
      'failed': 'danger',
      'primary': 'primary',
      'warning': 'warning',
      'info': 'info',
    }

    const live_sending_logs = this.props.data.live_sending_logs || [];

    const sales_cart_data = this.props.data.sales_cart_data ? {
      labels: this.props.data.sales_cart_data.labels,
      defaultFontFamily: 'Montserrat',
      datasets: [ {
        label: "Total",
        data: this.props.data.sales_cart_data.total,
        backgroundColor: 'transparent',
        borderColor: '#1E2246aa',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'transparent',
        pointBackgroundColor: '#1E2246bb',
      }, {
        label: "Undelivered",
        data: this.props.data.sales_cart_data.undelivered,
        backgroundColor: 'transparent',
        borderColor: '#f2574caa',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'transparent',
        pointBackgroundColor: '#f2574cbb',
      }, {
        label: "Delivered",
        data: this.props.data.sales_cart_data.delivered,
        backgroundColor: 'transparent',
        borderColor: '#45aaf2aa',
        borderWidth: 3,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: 'transparent',
        pointBackgroundColor: '#45aaf2bb',
      } ]
    } : {};

    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Dashboard</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Home</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Dashboard
              </li>
            </ol>
          </div>
          <div className='telecome-wrapper mt-2 mb-5'>
            <div className='telecome-operator operater1'>
              <div className='telecome-detail'>
                <div className='tel-logo'>
                  <img src={require('./../assets/images/att-logo.png')} alt='' />
                </div>
                <div className='tele-wrap'>
                  <span className='status'>Delivered:</span> <span className='number'>{att != undefined ? att.delivered : '-'}</span>
                  <span className='status'>Undelivered:</span> <span className='number'>{att != undefined ? att.undelivered : '-'}</span>
                </div>
                <div className='total'>
                  <span className='status'>Total Sent</span>
                  <span className='number'>{att != undefined ? att.total_sent : '-'}</span>
                </div>
              </div>
            </div>
            <div className='telecome-operator operater2'>
              <div className='telecome-detail'>
                <div className='tel-logo'>
                  <img src={require('./../assets/images/verizon-logo.png')} alt='' />
                </div>
                <div className='tele-wrap'>
                  <span className='status'>Delivered:</span> <span className='number'>{verizon != undefined ? verizon.delivered : '-'}</span>
                  <span className='status'>Undelivered:</span> <span className='number'>{verizon != undefined ? verizon.undelivered : '-'}</span>
                </div>
                <div className='total'>
                  <span className='status'>Total Sent</span>
                  <span className='number'>{verizon != undefined ? verizon.total_sent : '-'}</span>
                </div>
              </div>
            </div>
            <div className='telecome-operator operater3'>
              <div className='telecome-detail'>
                <div className='tel-logo'>
                  <img src={require('./../assets/images/t-mobile-logo.png')} alt='' />
                </div>
                <div className='tele-wrap'>
                  <span className='status'>Delivered:</span> <span className='number'>{tmobile != undefined ? tmobile.delivered : '-'}</span>
                  <span className='status'>Undelivered:</span> <span className='number'>{tmobile != undefined ? tmobile.undelivered : '-'}</span>
                </div>
                <div className='total'>
                  <span className='status'>Total Sent</span>
                  <span className='number'>{tmobile != undefined ? tmobile.total_sent : '-'}</span>
                </div>
              </div>
            </div>
            <div className='telecome-operator operater4'>
              <div className='telecome-detail'>
                <div className='tel-logo'>
                  <img src={require('./../assets/images/sprint-logo.png')} alt='' />
                </div>
                <div className='tele-wrap'>
                  <span className='status'>Delivered:</span> <span className='number'>{sprint != undefined ? sprint.delivered : '-'}</span>
                  <span className='status'>Undelivered:</span> <span className='number'>{sprint != undefined ? sprint.undelivered : '-'}</span>
                </div>
                <div className='total'>
                  <span className='status'>Total Sent</span>
                  <span className='number'>{sprint != undefined ? sprint.total_sent : '-'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='perform-campaign mt-7 mb-5'>
            <h3 className='page-title'>Top Performing Campaign</h3>
            <div className='row'>
              <div className='perform-wrap'>
                <div className='card offer1 text-center'>
                  <div className='card-body'>
                    <p className='mb-0 text-white'>{offer1 != undefined ? offer1.title : 'First Place'}</p>
                    <h4 className='text-white mb-0'>{offer1 != undefined ? offer1.text : 'Offer1'}</h4>
                  </div>
                </div>
              </div>
              <div className='perform-wrap'>
                <div className='card offer2 text-center'>
                  <div className='card-body'>
                    <p className='mb-0 text-white'>{offer2 != undefined ? offer2.title : 'Second Place'}</p>
                    <h4 className='text-white mb-0'>{offer2 != undefined ? offer2.text : 'Offer 2'}</h4>
                  </div>
                </div>
              </div>
              <div className='perform-wrap'>
                <div className='card offer3 text-center'>
                  <div className='card-body'>
                    <p className='mb-0 text-white'>{offer3 != undefined ? offer3.title : 'Third Place'}</p>
                    <h4 className='text-white mb-0'>{offer3 != undefined ? offer3.text : 'Offer 3'}</h4>
                  </div>
                </div>
              </div>
              <div className='perform-wrap'>
                <div className='card offer4 text-white text-center'>
                  <div className='card-body'>
                    <p className='mb-0 text-white'>{offer4 != undefined ? offer4.title : 'Fourth Place'}</p>
                    <h4 className='text-white mb-0'>{offer4 != undefined ? offer4.text : 'Offer 4'}</h4>
                  </div>
                </div>
              </div>
              <div className='perform-wrap'>
                <div className='card offer5 text-white text-center'>
                  <div className='card-body'>
                    <p className='mb-0 text-white'>{offer5 != undefined ? offer5.title : 'Fifth Place'}</p>
                    <h4 className='text-white mb-0'>{offer5 != undefined ? offer5.text : 'Offer 5'}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='dashboard-chart mt-5 mb-5'>
            <h3 className='page-title'>Daily Statistics</h3>
            <div className='row'>
              <div className='card'>
                <div className='card-header'>
                  <div className='form-group dis-table'>
                    <label className='form-label dis-table-cell pr-10'>Visit Stat for</label>
                    <select className='form-control select2 custom-select dis-table-cell' data-placeholder='Choose one' value={sales_cart_days} onChange={this.saleCartHandler}>
                      <option value='1500'>1500 Days</option>
                      <option value='30'>30 Days</option>
                      <option value='20'>20 Days</option>
                      <option value='10'>10 Days</option>
                    </select>
                  </div>

                  <div className='card-note-right'>
                    <div className='card-side'>
                      <span className='col-1'>Total</span>
                      <span className='col-2'>Undelivered</span>
                      <span className='col-3'>Delivered</span>
                    </div>
                  </div>
                </div>
                <div className='card-body'>
                  <Line data={sales_cart_data}
                    id='sales-chart'
                    height={300} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      tooltips: {
                        mode: 'index',
                        titleFontSize: 12,
                        titleFontColor: '#7886a0',
                        bodyFontColor: '#7886a0',
                        backgroundColor: '#fff',
                        titleFontFamily: 'Montserrat',
                        bodyFontFamily: 'Montserrat',
                        cornerRadius: 3,
                        intersect: false,
                      },
                      legend: {
                        display: false,
                        labels: {
                          usePointStyle: true,
                          fontFamily: 'Montserrat',
                        },
                      },
                      scales: {
                        xAxes: [ {
                          display: true,
                          gridLines: {
                            display: false,
                            drawBorder: false
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Month'
                          }
                        } ],
                        yAxes: [ {
                          display: true,
                          gridLines: {
                            display: true,
                            drawBorder: false
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Value'
                          }
                        } ]
                      },
                      title: {
                        display: false,
                        text: 'Normal Legend'
                      }
                    }} />
                </div>
              </div>
            </div>
          </div>

          <div className='logs-table'>
            <h3 className='page-title'>Live Sending Logs</h3>
            <div className='card'>
              <div className='card-header'>
                <h4 className='card-title'>Most recent sending logs from your account</h4>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <table className='table card-table table-vcenter  border text-nowrap'>
                    <thead>
                      <tr>
                        <th className='w-1'>Error Code</th>
                        <th>Reciever</th>
                        <th>Message</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {live_sending_logs.map((sItem, k) => 
                        <tr key={k}>
                          <td>
                            <span className='text-muted'>#{sItem['err-code']}</span>
                          </td>
                          <td>{sItem.carrier}</td>
                          <td className='td-msg'>{sItem.msg}</td>
                          <td>
                            <span className={`badge badge-pill badge-${log_badge[sItem.status]}`}>{sItem.status}</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
  return { auth: state.auth, data: state.data.dashboard };
};

const mapDispatchToProps = {
  receiveFetchData: receiveFetchData
};

Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default Dashboard;
