import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../assets/styles/header.css"

const SearchOffcanvas = () => {
  return (
    <div className="offcanvas offcanvas-top" id="searchOffcanvas">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Search</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
        <input type="text" className="form-control" placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchOffcanvas;
