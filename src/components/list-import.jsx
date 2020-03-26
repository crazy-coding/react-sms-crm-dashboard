import React, { Component } from "react";
import '../assets/css/dashboard.css';
import '../assets/css/plugin.css';
import '../assets/css/sidemenu-light.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faCode,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'reactstrap';
import { connect } from "react-redux";
import config from '../config/index';
import axios, { post } from 'axios';

class ListImport extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      file:null

    };

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFileChange(e) {
    this.setState({ file: e.target.files })


}
clearFiles(e) {
  e.target.value = null;
  this.setState({ file:  null });
}

onSubmit(e) {
    e.preventDefault()

    var formData = new FormData();
    var count = 0;

    // let file = e.target.files;
    // if (file && !file.name) {
    //    window.alert("Please select a file");
    //    return false;
    // }

    if(this.state.file != null){
      for (const key of Object.keys(this.state.file)) {
        if (this.state.file[key].size > 20e6) {
          window.alert("Please upload a file smaller than 20 MB");
          return false;
        } else{
        formData.append('files['+count+']', this.state.file[key])
        count++;
      }

      axios.post(config.list_import, formData, {headers: {
        'Authorization': `${this.props.auth.token_type} ${this.props.auth.access_token}`,
        'Content-Type': 'multipart/form-data'
      },formData
      }).then(res => {
          console.log(res.data)
      })
      // this.setState({ file:  e.target.value });
    }
}
}

  render() {
    return (
      <div className='side-app'>
        <div className='mb-5'>
          <div className='page-header mb-0'>
            <h3 className='page-title'>List Import</h3>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a href='#'>Lists</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                List Import
              </li>
            </ol>
          </div>

          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <div className='card logs-table'>
                <div className='card-header'>
                  <h4 className='card-title'>You can import multiple lists at once, maximum is 20MB/file and 10 files at one time or 1 file at 200MB.</h4>
                </div>

                <div className='list-import'>
                  <div className='form-group'>
                    {/* <div className='custom-file'>
                      <input type='file'  className='custom-file-input' name='example-file-input-custom' />
                      <label className='custom-file-label'>
                        <i className='si si-folder-alt' data-toggle='tooltip' title='' data-original-title='si-folder-alt'></i>Select file...
                      </label>
                      <button type='button' className='btn download'>
                        <i className='si si-cloud-download mr-2 text-white'></i>Download
                      </button>
                    </div> */}
                    <form onSubmit={this.onSubmit}>
                    <div className='custom-file upload-wrap'>
                      <input type='file' multiple onChange={this.onFileChange}  accept=".txt ,.csv" className='custom-file-input' name='example-file-input-custom' />
                      <button type='button' className='btn remove' onClick={(e)=>this.clearFiles(e)}>
                        <i className='fa fa-trash mr-2 text-white'></i>Remove
                      </button>
                      <button type='submit' className='btn upload'>
                        <i className='si si-cloud-upload mr-2 text-white'></i>Upload
                      </button>
                      <label className='custom-file-label'>
                        <i className='si si-folder-alt' data-toggle='tooltip' title='' data-original-title='si-folder-alt'></i>
                        {/* <span>
                          <i className='si si-doc mr-2'></i>file-sample.png
                        </span> */}
                      </label>
                    </div>
                    </form>
                  </div>
                </div>

                {/* <div className='card-body'>
                  <div className='table-responsive import'>
                    <table className='table table-bordered table-hover mb-0 text-nowrap'>
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td className='w20'>
                            <select className='table-select'>
                              <option value='1'>Phone</option>
                              <option value='2'>123456</option>
                              <option value='3'>234789</option>
                              <option value='4'>098765</option>
                            </select>
                          </td>
                          <td className='w20'>field Data</td>
                          <td className='w60'></td>
                        </tr>
                        <tr>
                          <td>
                            <select className='table-select'>
                              <option value='1'>First Name</option>
                              <option value='2'>abc</option>
                              <option value='3'>pqr</option>
                              <option value='4'>xyz</option>
                            </select>
                          </td>
                          <td>field Data</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <select className='table-select'>
                              <option value='1'>Last Name</option>
                              <option value='2'>abc</option>
                              <option value='3'>pqr</option>
                              <option value='4'>xyz</option>
                            </select>
                          </td>
                          <td>field Data</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <select className='table-select'>
                              <option value='1'>Custom A</option>
                              <option value='2'>Custom A</option>
                              <option value='3'>Custom A</option>
                              <option value='4'>Custom A</option>
                            </select>
                          </td>
                          <td>field Data</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <select className='table-select'>
                              <option value='1'>Custom B</option>
                              <option value='2'>Custom B</option>
                              <option value='3'>Custom B</option>
                              <option value='4'>Custom B</option>
                            </select>
                          </td>
                          <td>field Data</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <select className='table-select'>
                              <option value='1'>Custom C</option>
                              <option value='2'>Custom C</option>
                              <option value='3'>Custom C</option>
                              <option value='4'>Custom C</option>
                            </select>
                          </td>
                          <td>field Data</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
           */}
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
    auth: state.auth };
};

const mapDispatchToProps = {
};

ListImport = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListImport);

export default ListImport;