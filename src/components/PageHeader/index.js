import React from 'react';
import './styles.scss';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const PageHeader = ({ title }) => {
    return (
        <div className="page-header">
            <div className="page-header-container container">
                <div className="page-header-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>This</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="page-header-title">
                    <h1>{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;