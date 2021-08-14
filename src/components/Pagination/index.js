import React from 'react';
import './styles.scss';

const Pagination = ({ onLoadMoreEvent = () => { } }) => {
    return (
        <div className="pagination-view">
            <div className="load-more justify-content-center">
                <button onClick={() => onLoadMoreEvent()} className="btn btn-primary btn-lg"> Load More</button>
            </div>
        </div>
    );
};

export default Pagination;