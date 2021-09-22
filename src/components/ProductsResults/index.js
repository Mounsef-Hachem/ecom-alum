import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from '../../redux/Product/product.actions';
import ProductCard from '../ProductCard';
import Pagination from '../Pagination';
import './styles.scss';
import { fetchCategoriesStart } from '../../redux/Categories/categories.actions';

const mapState = ({ productsData, categoriesData }) => ({
    products: productsData.products,
    categories: categoriesData.categories.data
});

const ProductsResults = () => {
    const dispatch = useDispatch();
    const { products, categories } = useSelector(mapState);
    const history = useHistory();
    const { filterType } = useParams();

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        );
    }, [filterType]);

    useEffect(() => {
        dispatch(
            fetchCategoriesStart()
        );
    }, []);

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
                                <option value="" disabled hidden selected>
                                    Show All
                                </option>
                                {(Array.isArray(categories) && categories.length > 0) && categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.categoryName}>{category.categoryName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="products-view-list products-list">
                    <div className="product-list" >
                        {data.map((product, pos) => {
                            const { productImages, productName, productPrice } = product;
                            if (!productImages || !productName || typeof productPrice === 'undefined') return null;

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