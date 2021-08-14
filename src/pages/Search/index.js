import React from 'react';
import ProductsResults from '../../components/ProductsResults';
import './styles.scss';
import PageHeader from '../../components/PageHeader';

const Search = ({ }) => {
    const title = "Products";

    return (
        <>
            <PageHeader title={title} />
            <div className="container">
                <ProductsResults />
            </div>
        </>
    );
};

export default Search;