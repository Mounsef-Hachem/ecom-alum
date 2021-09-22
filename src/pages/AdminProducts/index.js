import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProductsStart } from './../../redux/Product/product.actions';
import PageHeader from './../../components//PageHeader';

import './styles.scss';
import ManageProducts from '../../components/ManageProducts';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );
    }, []);

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        );
    }

    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore
    };

    return (
        <div className="container">
            <PageHeader title={"Manage Products"} />
            <ManageProducts products={data} />
        </div>
    )
};

export default AdminProducts;