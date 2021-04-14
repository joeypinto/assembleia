import React from 'react';

const PageHeading = ({ title = '', subtitle = '' }) => (
    <div>
        <h1 className="h3 mb-2 text-gray-800">{title}</h1>
        <p className="mb-4">{subtitle}</p>
        {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
    </div >
)

export default PageHeading;