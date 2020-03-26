import React, { Component } from 'react';
import { connect } from "react-redux";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import '../assets/css/sidemenu-light.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faCode,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { receiveFetchData } from '../actions';
import config from '../config/index';
import axios from 'axios';
import SendSMSModal from './component/SendSMSModal'
import { PerPageOption, SearchOption, Pagination } from './component/TableOptions'
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';


class SendBulkSms extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      form: {
        name: null, 
        lists: null, 
        domain: null, 
        bypass: true, 
        message: null, 
        campaign: null, 
        scheduled_at_date: null,
        scheduled_at_time: null,
        messages: {}
      }
    };
  }

  search_select_option = (options, callback) => {
    if (options.q.length >= 3) {
      axios({
        method:"GET",
        headers: {
          'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
        },
        url:config.search,
        params: {
          type: options.type,
          page: options.page || 1,
          per_page: options.per_page || '20',
          sort: options.sort || 'asc',
          order_by: options.order_by || 'id',
          q: options.q || '',
          status: options.status || '',
          message: {}
        }
      })
      .then(res => {
        console.log("search_select_option_api_success ("+options.type+"):", res);
        var gotOptions = res.data.data.reduce(function (all, one) { 
          var ones = { value: one.id, label: one.name }
          all.push(ones)
          return all
        }, []);
        callback(gotOptions);
      }).catch(err=>{
        console.log("search_select_option_api_error:", err);
        callback([])
      });
    } else {
      switch (options.type) {
        case "list":
          callback(this.props.data.list_list);
          break;
        case "domain":
          callback(this.props.data.domain_list);
          break;
        case "campaign":
          callback(this.props.data.campaign_list);
          break;
      }
    }
  }

  submitAction = (event) => {
    event.preventDefault();

    console.log('submitted', this.state.form);
    var { name, lists, domain, campaign, bypass, message, scheduled_at_date, scheduled_at_time } = this.state.form;
    axios({
      method: "POST",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url:config.send_bulk_sms,
      params: {
        name: name, 
        lists: lists, 
        domain: domain, 
        bypass: bypass, 
        message: message, 
        pool: campaign, 
        scheduled_at: scheduled_at_date + ' ' + scheduled_at_time + ':00'
      }
    })
    .then(res => {
      console.log("submit_bulk_sms_api_success:", res);
      toast.notify("Send bulk sms info saved successfully.", {position: 'top-right', duration: 2000});
      this.setState((prevState) => ({ ...prevState,
        form: {
          name: null, 
          lists: null, 
          domain: null, 
          bypass: true, 
          message: null, 
          campaign: null, 
          scheduled_at_date: null,
          scheduled_at_time: null,
          messages: {}
        },
      }))
    }).catch(err=>{
      console.log("submit_bulk_sms_api_error:", err);
      toast.notify("Send bulk sms info not saved.", {position: 'top-right', duration: 2000});
      this.setState((prevState) => ({ ...prevState,
        form: { ...prevState.form,
          messages: err.response.data.message
        },
      }))
    });
  }

  listsChange = selectedOption => {
    var lists = selectedOption.map(({ value }) => value).join(',');
    this.setState((prevState) => ({ ...prevState,
      form: { ...prevState.form,
        lists: lists
      }
    }));
  }
  listLoadOptions = (inputValue, callback) => {
    this.search_select_option({ type: 'list', q: inputValue, status: 'active' }, callback);
  };

  campaignChange = selectedOption => {
    this.setState((prevState) => ({ ...prevState,
      form: { ...prevState.form,
        campaign: selectedOption.value
      }
    }));
  }
  campaignLoadOptions = (inputValue, callback) => {
    this.search_select_option({ type: 'campaign', q: inputValue }, callback);
  };

  domainChange = selectedOption => {
    this.setState((prevState) => ({ ...prevState,
      form: { ...prevState.form,
        domain: selectedOption.value
      }
    }));
  }
  domainLoadOptions = (inputValue, callback) => {
    this.search_select_option({ type: 'domain', q: inputValue, status: 'active' }, callback);
  };
  
  inputHandler = e => {
    var inputs = {};
    inputs[e.target.name] = e.target.value;
    this.setState((prevState) => ({ ...prevState,
      form: { ...prevState.form,
        ...inputs
      }
    }));
  }

  fetch_list_list = () => {
    axios({
      method:"GET",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url:config.lists,
      params: {
        page: 1,
        per_page: '20',
        sort: 'asc',
        order_by: 'id',
      }
    })
    .then(res => {
      console.log("list_list_api_success:", res)
      var gotOptions = res.data.data.reduce(function (all, one) { 
        var ones = { value: one.id, label: one.name }
        all.push(ones)
        return all
      }, [])
      this.props.receiveFetchData({
        send_bulk_sms: { ...this.props.data,
          list_list: gotOptions }
      });
      this.setState((prevState) => ({
        list_list: gotOptions }));
    }).catch(err=>{
      console.log("list_list_api_error:", err);
    });
  }
  fetch_campaign_list = () => {
    axios({
      method:"GET",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url:config.campaigns,
      params: {
        page: 1,
        per_page: '20',
        sort: 'asc',
        order_by: 'id',
      }
    })
    .then(res => {
      console.log("campaign_list_api_success:", res)
      var gotOptions = res.data.data.reduce(function (all, one) { 
        var ones = { value: one.id, label: one.name }
        all.push(ones)
        return all
      }, [])
      this.props.receiveFetchData({
        send_bulk_sms: { ...this.props.data,
          campaign_list: gotOptions }
      });
      this.setState((prevState) => ({
        campaign_list: gotOptions }));
    }).catch(err=>{
      console.log("campaigns_list_api_error:", err);
    });
  }
  fetch_domain_list = () => {
    axios({
      method:"GET",
      headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`
      },
      url:config.domains,
      params: {
        page: 1,
        per_page: '20',
        sort: 'asc',
        order_by: 'id',
      }
    })
    .then(res => {
      console.log("domain_list_api_success:", res)
      var gotOptions = res.data.data.reduce(function (all, one) { 
        var ones = { value: one.id, label: one.domain }
        all.push(ones)
        return all
      }, [])
      this.props.receiveFetchData({
        send_bulk_sms: { ...this.props.data,
          domain_list: gotOptions }
      });
      this.setState((prevState) => ({
        domain_list: gotOptions }));
    }).catch(err=>{
      console.log("domain_list_api_error:", err);
    });
  }

  componentWillMount() {
    if (!this.props.data.list_list) {
      this.fetch_list_list();
    }
    if (!this.props.data.campaign_list) {
      this.fetch_campaign_list();
    }
    if (!this.props.data.domain_list) {
      this.fetch_domain_list();
    }
  }

  render() {
    const { name, message, messages, scheduled_at_date, scheduled_at_time } = this.state.form;
    const { list_list, domain_list, campaign_list } = this.props.data;

    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>Send Bulk SMS</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Campaign</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Send Bulk SMS
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card account-form send-bulk'>
                <form onSubmit={this.submitAction}>
                  <div className='card-header'>
                    <h4 className='card-title'>You can manage all of your Domains in here.</h4>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-12'>
                        <div className='form-group'>
                          <label className='form-label'>Drop Name</label>
                          <div className='form-wrap'>
                            <input type='text' className='form-control' name='name' value={name} onChange={this.inputHandler} />
                            <p className="error-message">{messages['name']}</p>
                            <p>
                              <em>Enter the name of this drop.</em>
                            </p>
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>List</label>
                          <div className='form-wrap'>
                            <AsyncSelect
                              className="mb-2"
                              isMulti
                              cacheOptions
                              loadOptions={this.listLoadOptions}
                              defaultOptions={list_list}
                              onChange={this.listsChange}
                            />
                            <p className="error-message">{messages['lists']}</p>
                            <p>
                              <em>Select the Lists you would like to send to.</em>
                            </p>
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='form-label'>Date & Time</label>
                          <div className='input-group form-wrap'>
                            <div className='input-group-prepend'>
                              <div className='input-group-text'>
                                <i className='si si-calendar'></i>
                              </div>
                            </div>
                            <input className='form-control fc-datepicker hasDatepicker' type='date' value={scheduled_at_date} onChange={this.inputHandler} name="scheduled_at_date" />
                            <input className='form-control fc-datepicker hasDatepicker' type='time' value={scheduled_at_time} onChange={this.inputHandler} name="scheduled_at_time" />
                            <br/>
                            <p className="error-message">{messages['scheduled_at']}</p>
                            <p>
                              <em>Please select the date and time you want the message to send out, leave blank to send immediately.</em>
                            </p>
                          </div>
                        </div>

                        <div className='form-group text-area'>
                          <label className='form-label'>Ad Content</label>
                          <div className='form-wrap'>
                            <textarea className='form-control' name="message" value={message} onChange={this.inputHandler} rows='5'></textarea>
                            <p className="error-message">{messages['message']}</p>
                            <button type='submit' className='btn btn-danger magic'>
                              Supported Magic tag
                            </button>
                            <p>
                              <em>Enter the ad content you want to send out.</em>
                            </p>
                          </div>
                        </div>

                        <div className='form-group'>
                          <label className='form-label'>Domain</label>
                          <div className='form-wrap'>
                            <AsyncSelect
                              className="mb-2"
                              cacheOptions
                              loadOptions={this.domainLoadOptions}
                              defaultOptions={domain_list}
                              onChange={this.domainChange}
                            />
                            <p className="error-message">{messages['domain']}</p>
                            <p>
                              <em>Select the domain you want to use as the redirect domain for this send.</em>
                            </p>
                          </div>
                        </div>

                        <div className='form-group'>
                          <label className='form-label'>Campaigns</label>
                          <div className='form-wrap'>
                            <AsyncSelect
                              className="mb-2"
                              cacheOptions
                              loadOptions={this.campaignLoadOptions}
                              defaultOptions={campaign_list}
                              onChange={this.campaignChange}
                            />
                            <p className="error-message">{messages['pool']}</p>
                            <p>
                              <em>Select the Campaign you want to use as the redirect domain for this send.</em>
                            </p>
                          </div>
                        </div>

                        <div className='account-btn'>
                          <button type='submit' className='btn btn-primary mr-3 submit'>
                            <i className='si si-plus mr-2 text-white'></i>Submit
                          </button>
                          <button type='button' className='btn btn-primary clear'>
                            <i className='si si-refresh mr-2 text-white'></i>Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { data: state.data.send_bulk_sms,
    auth: state.auth };
};

const mapDispatchToProps = {
  receiveFetchData: receiveFetchData
};

SendBulkSms = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendBulkSms);

export default SendBulkSms;