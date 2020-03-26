import React, { Component } from "react";
import config from '../config/index';
import axios from "axios";
import { connect } from "react-redux";
import { setMessage } from "../actions/index";
import loader from "../assets/images/loader.gif";


class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      registerAttribute : {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        company: '',
        country: 'US',
        terms: '',
        password: '',
        password_confirm: '',
      },
      message: {},
      isLoader: false
    };
    this.registerAction = this.registerAction.bind(this);
  }

  setRegisterHandler = (e)=>{
    let copyregisterAttribute = {...this.state.registerAttribute};
    copyregisterAttribute[e.target.name]=e.target.value;
    if (e.target.name == 'terms') {
      copyregisterAttribute[e.target.name]=e.target.checked;
    }
    this.setState({
      registerAttribute:copyregisterAttribute,
      message: { ...this.state.message, [e.target.name]: '' }
    });
    if (e.target.name == 'password_confirm') {
      if (copyregisterAttribute['password'] != e.target.value)
      this.setState({
        message: {...this.state.message, [e.target.name]: 'Not equal with password.'}
      });
    }
  }

  registerAction = () => {
    if (this.state.registerAttribute.terms) {
      this.setState({ isLoader: true });
      axios({
        method:"POST",
        url:config.register, 
        data:{
          ...this.state.registerAttribute
        }
      })
      .then(res => {
        console.log("register_api_success:", res)
        this.props.setMessage({
          global_message: res.data.message
        })
        this.setState({ isLoader: false });
      }).catch(err=>{
        console.log("register_api_error:", err.response);
        this.setState({
          message: err.response.data.message
        });
        this.setState({ isLoader: false });
      });
    } else {
      this.setState({
        message: {
          terms: 'Please agree to all Terms for signup.'
        }
      });
    }
  };

  render() {
    const { first_name, last_name, email, company, country, terms, phone, password, password_confirm } = this.state.registerAttribute;
    const { message, isLoader } = this.state;
    const global_message = this.props.global_message || '';

    return (
      <div className="login-bg">
        <div id='global-loader' className={isLoader?'':'d-none'}>
          <img src={loader} alt='loader' />
        </div>
        <div className="custompage">
          <div className="login custom-content mt-0 register">
            <div className="row">
              <div className="col d-block mx-auto">
                <div className="row">
                  <div className="col-md-12">
                    <img src={require("../assets/images/logo.png")} className="header-brand-img mb-5 mt-2 mt-lg-0 " alt="logo"/>
                    <h3 className="text-center">Register</h3>
                    <div className={global_message ? 'alert alert-info' : 'alert alert-info d-none'} id="global_message">{global_message}</div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="FirstName">First Name</label>
                      <input type="text" className="form-control" name="first_name" onChange={this.setRegisterHandler} placeholder="First Name" value={first_name}/>
                      <p className="login-form-error">{message.first_name}</p>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="LastName">Last Name</label>
                      <input type="text" className="form-control" name="last_name" onChange={this.setRegisterHandler} placeholder="Last Name" value={last_name}/>
                      <p className="login-form-error">{message.last_name}</p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="Password">Password</label>
                      <input type="password" className="form-control" name="password" onChange={this.setRegisterHandler} placeholder="Last Name" value={password}/>
                      <p className="login-form-error">{message.password}</p>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="PConfirm">Password Confirm</label>
                      <input type="password" className="form-control" name="password_confirm" onChange={this.setRegisterHandler} placeholder="Last Name" value={password_confirm}/>
                      <p className="login-form-error">{message.password_confirm}</p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="Company">Company</label>
                      <input type="text" className="form-control" name="company" onChange={this.setRegisterHandler} placeholder="Company" value={company}/>
                      <p className="login-form-error">{message.company}</p>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="FirstName">Email</label>
                      <input type="email" className="form-control" name="email" onChange={this.setRegisterHandler} placeholder="Email" value={email}/>
                      <p className="login-form-error">{message.email}</p>
                    </div>    
                    <div className="clearfix"></div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="FirstName">Phone</label>
                      <input type="tel" className="form-control" name="phone" onChange={this.setRegisterHandler} placeholder="Phone" value={phone}/>
                      <p className="login-form-error">{message.phone}</p>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-left" htmlFor="FirstName">Country</label>
                      <select className="form-control select2" name="country" onChange={this.setRegisterHandler} value={country}>
                        <option value="US" phonecode="1" defaultValue="">USA (+1)</option>
                        <option value="GB" phonecode="44">UK (+44)</option>
                        <option disabled="disabled">Other Countries</option>
                        <option value="DZ" phonecode="213">Algeria (+213)</option>
                        <option value="AD" phonecode="376">Andorra (+376)</option>
                        <option value="AO" phonecode="244">Angola (+244)</option>
                        <option value="AI" phonecode="1264">Anguilla (+1264)</option>
                        <option value="AG" phonecode="1268">Antigua &amp; Barbuda (+1268)</option>
                        <option value="AR" phonecode="54">Argentina (+54)</option>
                        <option value="AM" phonecode="374">Armenia (+374)</option>
                        <option value="AW" phonecode="297">Aruba (+297)</option>
                        <option value="AU" phonecode="61">Australia (+61)</option>
                        <option value="AT" phonecode="43">Austria (+43)</option>
                        <option value="AZ" phonecode="994">Azerbaijan (+994)</option>
                        <option value="BS" phonecode="1242">Bahamas (+1242)</option>
                        <option value="BH" phonecode="973">Bahrain (+973)</option>
                        <option value="BD" phonecode="880">Bangladesh (+880)</option>
                        <option value="BB" phonecode="1246">Barbados (+1246)</option>
                        <option value="BY" phonecode="375">Belarus (+375)</option>
                        <option value="BE" phonecode="32">Belgium (+32)</option>
                        <option value="BZ" phonecode="501">Belize (+501)</option>
                        <option value="BJ" phonecode="229">Benin (+229)</option>
                        <option value="BM" phonecode="1441">Bermuda (+1441)</option>
                        <option value="BT" phonecode="975">Bhutan (+975)</option>
                        <option value="BO" phonecode="591">Bolivia (+591)</option>
                        <option value="BA" phonecode="387">Bosnia Herzegovina (+387)</option>
                        <option value="BW" phonecode="267">Botswana (+267)</option>
                        <option value="BR" phonecode="55">Brazil (+55)</option>
                        <option value="BN" phonecode="673">Brunei (+673)</option>
                        <option value="BG" phonecode="359">Bulgaria (+359)</option>
                        <option value="BF" phonecode="226">Burkina Faso (+226)</option>
                        <option value="BI" phonecode="257">Burundi (+257)</option>
                        <option value="KH" phonecode="855">Cambodia (+855)</option>
                        <option value="CM" phonecode="237">Cameroon (+237)</option>
                        <option value="CA" phonecode="1">Canada (+1)</option>
                        <option value="CV" phonecode="238">Cape Verde Islands (+238)</option>
                        <option value="KY" phonecode="1345">Cayman Islands (+1345)</option>
                        <option value="CF" phonecode="236">Central African Republic (+236)</option>
                        <option value="CL" phonecode="56">Chile (+56)</option>
                        <option value="CN" phonecode="86">China (+86)</option>
                        <option value="CO" phonecode="57">Colombia (+57)</option>
                        <option value="KM" phonecode="269">Comoros (+269)</option>
                        <option value="CG" phonecode="242">Congo (+242)</option>
                        <option value="CK" phonecode="682">Cook Islands (+682)</option>
                        <option value="CR" phonecode="506">Costa Rica (+506)</option>
                        <option value="HR" phonecode="385">Croatia (+385)</option>
                        <option value="CU" phonecode="53">Cuba (+53)</option> 
                        <option value="CY" phonecode="90">Cyprus - North (+90)</option>
                        <option value="CY" phonecode="357">Cyprus - South (+357)</option>
                        <option value="CZ" phonecode="420">Czech Republic (+420)</option>
                        <option value="DK" phonecode="45">Denmark (+45)</option>
                        <option value="DJ" phonecode="253">Djibouti (+253)</option>
                        <option value="DM" phonecode="1809">Dominica (+1809)</option>
                        <option value="DO" phonecode="1809">Dominican Republic (+1809)</option>
                        <option value="EC" phonecode="593">Ecuador (+593)</option>
                        <option value="EG" phonecode="20">Egypt (+20)</option>
                        <option value="SV" phonecode="503">El Salvador (+503)</option>
                        <option value="GQ" phonecode="240">Equatorial Guinea (+240)</option>
                        <option value="ER" phonecode="291">Eritrea (+291)</option>
                        <option value="EE" phonecode="372">Estonia (+372)</option>
                        <option value="ET" phonecode="251">Ethiopia (+251)</option>
                        <option value="FK" phonecode="500">Falkland Islands (+500)</option>
                        <option value="FO" phonecode="298">Faroe Islands (+298)</option>
                        <option value="FJ" phonecode="679">Fiji (+679)</option>
                        <option value="FI" phonecode="358">Finland (+358)</option>
                        <option value="FR" phonecode="33">France (+33)</option>
                        <option value="GF" phonecode="594">French Guiana (+594)</option>
                        <option value="PF" phonecode="689">French Polynesia (+689)</option>
                        <option value="GA" phonecode="241">Gabon (+241)</option>
                        <option value="GM" phonecode="220">Gambia (+220)</option>
                        <option value="GE" phonecode="7880">Georgia (+7880)</option>
                        <option value="DE" phonecode="49">Germany (+49)</option>
                        <option value="GH" phonecode="233">Ghana (+233)</option>
                        <option value="GI" phonecode="350">Gibraltar (+350)</option>
                        <option value="GR" phonecode="30">Greece (+30)</option>
                        <option value="GL" phonecode="299">Greenland (+299)</option>
                        <option value="GD" phonecode="1473">Grenada (+1473)</option>
                        <option value="GP" phonecode="590">Guadeloupe (+590)</option>
                        <option value="GU" phonecode="671">Guam (+671)</option>
                        <option value="GT" phonecode="502">Guatemala (+502)</option>
                        <option value="GN" phonecode="224">Guinea (+224)</option>
                        <option value="GW" phonecode="245">Guinea - Bissau (+245)</option>
                        <option value="GY" phonecode="592">Guyana (+592)</option>
                        <option value="HT" phonecode="509">Haiti (+509)</option>
                        <option value="HN" phonecode="504">Honduras (+504)</option>
                        <option value="HK" phonecode="852">Hong Kong (+852)</option>
                        <option value="HU" phonecode="36">Hungary (+36)</option>
                        <option value="IS" phonecode="354">Iceland (+354)</option>
                        <option value="IN" phonecode="91">India (+91)</option>
                        <option value="ID" phonecode="62">Indonesia (+62)</option>
                        <option value="IQ" phonecode="964">Iraq (+964)</option>
                        <option value="IR" phonecode="98">Iran (+98)</option>
                        <option value="IE" phonecode="353">Ireland (+353)</option>
                        <option value="IL" phonecode="972">Israel (+972)</option>
                        <option value="IT" phonecode="39">Italy (+39)</option>
                        <option value="JM" phonecode="1876">Jamaica (+1876)</option>
                        <option value="JP" phonecode="81">Japan (+81)</option>
                        <option value="JO" phonecode="962">Jordan (+962)</option>
                        <option value="KZ" phonecode="7">Kazakhstan (+7)</option>
                        <option value="KE" phonecode="254">Kenya (+254)</option>
                        <option value="KI" phonecode="686">Kiribati (+686)</option>
                        <option value="KP" phonecode="850">Korea - North (+850)</option> 
                        <option value="KR" phonecode="82">Korea - South (+82)</option>
                        <option value="KW" phonecode="965">Kuwait (+965)</option>
                        <option value="KG" phonecode="996">Kyrgyzstan (+996)</option>
                        <option value="LA" phonecode="856">Laos (+856)</option>
                        <option value="LV" phonecode="371">Latvia (+371)</option>
                        <option value="LB" phonecode="961">Lebanon (+961)</option>
                        <option value="LS" phonecode="266">Lesotho (+266)</option>
                        <option value="LR" phonecode="231">Liberia (+231)</option>
                        <option value="LY" phonecode="218">Libya (+218)</option>
                        <option value="LI" phonecode="417">Liechtenstein (+417)</option>
                        <option value="LT" phonecode="370">Lithuania (+370)</option>
                        <option value="LU" phonecode="352">Luxembourg (+352)</option>
                        <option value="MO" phonecode="853">Macao (+853)</option>
                        <option value="MK" phonecode="389">Macedonia (+389)</option>
                        <option value="MG" phonecode="261">Madagascar (+261)</option>
                        <option value="MW" phonecode="265">Malawi (+265)</option>
                        <option value="MY" phonecode="60">Malaysia (+60)</option>
                        <option value="MV" phonecode="960">Maldives (+960)</option>
                        <option value="ML" phonecode="223">Mali (+223)</option>
                        <option value="MT" phonecode="356">Malta (+356)</option>
                        <option value="MH" phonecode="692">Marshall Islands (+692)</option>
                        <option value="MQ" phonecode="596">Martinique (+596)</option>
                        <option value="MR" phonecode="222">Mauritania (+222)</option>
                        <option value="YT" phonecode="269">Mayotte (+269)</option>
                        <option value="MX" phonecode="52">Mexico (+52)</option>
                        <option value="FM" phonecode="691">Micronesia (+691)</option>
                        <option value="MD" phonecode="373">Moldova (+373)</option>
                        <option value="MC" phonecode="377">Monaco (+377)</option>
                        <option value="MN" phonecode="976">Mongolia (+976)</option>
                        <option value="MS" phonecode="1664">Montserrat (+1664)</option>
                        <option value="MA" phonecode="212">Morocco (+212)</option>
                        <option value="MZ" phonecode="258">Mozambique (+258)</option>
                        <option value="MN" phonecode="95">Myanmar (+95)</option>
                        <option value="NA" phonecode="264">Namibia (+264)</option>
                        <option value="NR" phonecode="674">Nauru (+674)</option>
                        <option value="NP" phonecode="977">Nepal (+977)</option>
                        <option value="NL" phonecode="31">Netherlands (+31)</option>
                        <option value="NC" phonecode="687">New Caledonia (+687)</option>
                        <option value="NZ" phonecode="64">New Zealand (+64)</option>
                        <option value="NI" phonecode="505">Nicaragua (+505)</option>
                        <option value="NE" phonecode="227">Niger (+227)</option>
                        <option value="NG" phonecode="234">Nigeria (+234)</option>
                        <option value="NU" phonecode="683">Niue (+683)</option>
                        <option value="NF" phonecode="672">Norfolk Islands (+672)</option>
                        <option value="NP" phonecode="670">Northern Marianas (+670)</option>
                        <option value="NO" phonecode="47">Norway (+47)</option>
                        <option value="OM" phonecode="968">Oman (+968)</option>
                        <option value="PK" phonecode="92">Pakistan (+92)</option>
                        <option value="PW" phonecode="680">Palau (+680)</option>
                        <option value="PA" phonecode="507">Panama (+507)</option>
                        <option value="PG" phonecode="675">Papua New Guinea (+675)</option>
                        <option value="PY" phonecode="595">Paraguay (+595)</option>
                        <option value="PE" phonecode="51">Peru (+51)</option>
                        <option value="PH" phonecode="63">Philippines (+63)</option>
                        <option value="PL" phonecode="48">Poland (+48)</option>
                        <option value="PT" phonecode="351">Portugal (+351)</option>
                        <option value="PR" phonecode="1787">Puerto Rico (+1787)</option>
                        <option value="QA" phonecode="974">Qatar (+974)</option>
                        <option value="RE" phonecode="262">Reunion (+262)</option>
                        <option value="RO" phonecode="40">Romania (+40)</option>
                        <option value="RU" phonecode="7">Russia (+7)</option>
                        <option value="RW" phonecode="250">Rwanda (+250)</option>
                        <option value="SM" phonecode="378">San Marino (+378)</option>
                        <option value="ST" phonecode="239">Sao Tome &amp; Principe (+239)</option>
                        <option value="SA" phonecode="966">Saudi Arabia (+966)</option>
                        <option value="SN" phonecode="221">Senegal (+221)</option>
                        <option value="CS" phonecode="381">Serbia (+381)</option>
                        <option value="SC" phonecode="248">Seychelles (+248)</option>
                        <option value="SL" phonecode="232">Sierra Leone (+232)</option>
                        <option value="SG" phonecode="65">Singapore (+65)</option>
                        <option value="SK" phonecode="421">Slovak Republic (+421)</option>
                        <option value="SI" phonecode="386">Slovenia (+386)</option>
                        <option value="SB" phonecode="677">Solomon Islands (+677)</option>
                        <option value="SO" phonecode="252">Somalia (+252)</option>
                        <option value="ZA" phonecode="27">South Africa (+27)</option>
                        <option value="ES" phonecode="34">Spain (+34)</option>
                        <option value="LK" phonecode="94">Sri Lanka (+94)</option>
                        <option value="SH" phonecode="290">St. Helena (+290)</option>
                        <option value="KN" phonecode="1869">St. Kitts (+1869)</option>
                        <option value="SC" phonecode="1758">St. Lucia (+1758)</option>
                        <option value="SR" phonecode="597">Suriname (+597)</option>
                        <option value="SD" phonecode="249">Sudan (+249)</option>
                        <option value="SZ" phonecode="268">Swaziland (+268)</option>
                        <option value="SE" phonecode="46">Sweden (+46)</option>
                        <option value="CH" phonecode="41">Switzerland (+41)</option>
                        <option value="SY" phonecode="963">Syria (+963)</option> 
                        <option value="TW" phonecode="886">Taiwan (+886)</option>
                        <option value="TJ" phonecode="992">Tajikistan (+992)</option>
                        <option value="TH" phonecode="66">Thailand (+66)</option>
                        <option value="TG" phonecode="228">Togo (+228)</option>
                        <option value="TO" phonecode="676">Tonga (+676)</option>
                        <option value="TT" phonecode="1868">Trinidad &amp; Tobago (+1868)</option>
                        <option value="TN" phonecode="216">Tunisia (+216)</option>
                        <option value="TR" phonecode="90">Turkey (+90)</option>
                        <option value="TM" phonecode="993">Turkmenistan (+993)</option>
                        <option value="TC" phonecode="1649">Turks &amp; Caicos Islands (+1649)</option>
                        <option value="TV" phonecode="688">Tuvalu (+688)</option>
                        <option value="UG" phonecode="256">Uganda (+256)</option>
                        <option value="UA" phonecode="380">Ukraine (+380)</option>
                        <option value="AE" phonecode="971">United Arab Emirates (+971)</option>
                        <option value="UY" phonecode="598">Uruguay (+598)</option>
                        <option value="UZ" phonecode="998">Uzbekistan (+998)</option>
                        <option value="VU" phonecode="678">Vanuatu (+678)</option>
                        <option value="VA" phonecode="379">Vatican City (+379)</option>
                        <option value="VE" phonecode="58">Venezuela (+58)</option>
                        <option value="VN" phonecode="84">Vietnam (+84)</option>
                        <option value="VG" phonecode="1">Virgin Islands - British (+1)</option>
                        <option value="VI" phonecode="1">Virgin Islands - US (+1)</option>
                        <option value="WF" phonecode="681">Wallis &amp; Futuna (+681)</option>
                        <option value="YE" phonecode="969">Yemen (North)(+969)</option>
                        <option value="YE" phonecode="967">Yemen (South)(+967)</option>
                        <option value="ZM" phonecode="260">Zambia (+260)</option>
                        <option value="ZW" phonecode="263">Zimbabwe (+263)</option>
                      </select>
                      <p className="login-form-error">{message.country}</p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="checkbox text-left mb-2">
                      <div className="custom-checkbox custom-control">
                        <input type="checkbox" data-checkboxes="mygroup" readOnly className="custom-control-input" onChange={this.setRegisterHandler} name="terms" id="checkbox-2" value={terms}/>
                        <label htmlFor="checkbox-2" className="custom-control-label">I agree to all <a href="https://www.sendplex.com/terms.html" target="_blank" className="a-link">Terms</a></label>
                        <p className="login-form-error">{message.terms}</p>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="text-left">
                      <button type="submit" className="btn btn-primary" onClick={this.registerAction}>Sign up</button>{' '}
                      <button type="submit" className="btn btn-danger">Cancel</button>
                    </div>
                    <div className="clearfix"></div>
                    <div className="text-left text-muted mt-3">
                      Already have an account? <a href="login">Sign in</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return { auth: state.auth, ...state.message };
};

const mapDispatchToProps = {
  setMessage: setMessage
}

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
export default Register;