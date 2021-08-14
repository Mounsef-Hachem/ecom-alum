import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from '../../redux/Product/product.actions';
import ProductCard from '../ProductCard';
import Pagination from '../Pagination';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductsResults = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);
    const history = useHistory();
    const { filterType } = useParams();

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        );
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    }

    if (!Array.isArray(data)) return null;

    if (data.length < 1) {
        return (
            <p>No search results.</p>
        );
    }

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({ filterType, startAfterDoc: queryDoc, persistProducts: data })
        );
    }

    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    };

    return (

        <div className="block">
            <div className="products-view">
                <div className="products-view-options">
                    <div className="view-options">
                        <div className="view-options-filters">
                            <label htmlFor="view-options-filter">Filter By</label>
                            <select value={filterType} onChange={handleFilter} id="view-options-filter" className="form-select form-select-sm">
                                <option value="">
                                    Show All
                                </option>
                                <option value="Category1">
                                    Cat1
                                </option>
                                <option value="Category2">
                                    Cat2
                                </option>
                                <option value="Category3">
                                    Cat3
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="products-view-list products-list">
                    <div className="product-list" >
                        {data.map((product, pos) => {
                            const { productThumbnail, productName, productPrice } = product;
                            if (!productThumbnail || !productName || typeof productPrice === 'undefined') return null;

                            const configProduct = {
                                ...product
                            }

                            return (
                                <div className="product-list-item" key={pos}>
                                    <ProductCard {...configProduct} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {!isLastPage && (
                    <Pagination  {...configLoadMore} />
                )}
            </div>
        </div >
    );
};

export default ProductsResults;