import React from 'react';
import PropTypes from 'prop-types';


export const PerPageOption = ({onChange, value}) => {
  return <div className="form-inline ">
    <div className="form-group">Show 
      <select placeholder="select" className="form-control-sm mx-1 form-control" onChange={onChange} value={value} >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select> entries
    </div>
  </div>
}

PerPageOption.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export const SearchOption = ({onChange, value, message}) => {
  return <div className="text-right form-group">Search: 
    <input placeholder="Enter text" style={{maxWidth: '200px', minWidth: '200px'}} type="text" className="d-inline input-sm form-control ml-1" onChange={onChange} value={value} />
    <p className="login-form-error text-right">{message['q']}</p>
  </div>
}

SearchOption.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  message: PropTypes.object
};

export const Pagination = ({ option, onClick }) => {
  const { current_page, from, to, per_page, total, last_page } = option;
  const currentPage = current_page;
  const firstPage = currentPage > 1 ? 1 : false; 
  const prevPage = (currentPage - 1) > 0 ? (currentPage - 1) : false;
  const nextPage = (currentPage + 1) <= last_page ? (currentPage + 1) : false;
  const lastPage = last_page > currentPage ? last_page : false

  return <div className="row">
    <div className="col-sm-12 col-md-5">
      <div className="dataTables_info" id="example-2_info" role="status" aria-live="polite">Showing {from} to {to} of {total} entries</div>
    </div>
    <div className="col-sm-12 col-md-7">
      <div className="dataTables_paginate paging_simple_numbers">
        <ul className="pagination justify-content-end">
          <li className={`paginate_button page-item previous ${firstPage ? '' : 'disabled'}`}>
            <button className="page-link" onClick={() => onClick(firstPage)}>First</button>
          </li>
          <li className={`paginate_button page-item previous ${prevPage ? '' : 'disabled'}`}>
            <button className="page-link" onClick={() => onClick(prevPage)}>Previous</button>
          </li>
          {((currentPage - 2) > 0) &&  
          <li className="paginate_button page-item">
            <button className="page-link" onClick={() => onClick((currentPage - 2))}>{currentPage - 2}</button>
          </li>
          }
          {((currentPage - 1) > 0) &&  
          <li className="paginate_button page-item">
            <button className="page-link" onClick={() => onClick((currentPage - 1))}>{currentPage - 1}</button>
          </li>
          }
          {(currentPage) &&  
          <li className="paginate_button page-item active">
            <button className="page-link">{currentPage}</button>
          </li>
          }
          {((currentPage + 1) <= lastPage) &&  
          <li className="paginate_button page-item">
            <button className="page-link" onClick={() => onClick((currentPage + 1))}>{currentPage + 1}</button>
          </li>
          }
          {((currentPage + 2) <= lastPage) &&  
          <li className="paginate_button page-item">
            <button className="page-link" onClick={() => onClick((currentPage + 2))}>{currentPage + 2}</button>
          </li>
          }
          <li className={`paginate_button page-item next ${nextPage ? '' : 'disabled'}`}>
            <button className="page-link" onClick={() => onClick(nextPage)}>Next</button>
          </li>
          <li className={`paginate_button page-item next ${lastPage ? '' : 'disabled'}`}>
            <button className="page-link" onClick={() => onClick(lastPage)}>Last</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
};

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired,
  tableOption: PropTypes.object
};
