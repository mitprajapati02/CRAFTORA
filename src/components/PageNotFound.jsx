import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (

    <div className="container mt-5">
        <div className="row">
            <div className="col-md-12 text-center">
                <h1>Page Not Found</h1>
                <Link to="/" className="btn btn-primary">Go to Home</Link>
            </div>
        </div>
    </div>
  );
};

export default PageNotFound;
