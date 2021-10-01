import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart, setProducts } from '../../redux/Product/product.actions';
import ProductCard from '../ProductCard';

import { fetchCategoriesStart } from '../../redux/Categories/categories.actions';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.scss';

const mapState = ({ productsData, categoriesData }) => ({
    products: productsData.products,
    categories: categoriesData.categories.data
});

const Featured = () => {
    const dispatch = useDispatch();
    const { products, categories } = useSelector(mapState);
    const history = useHistory();
    const [filterType, setFilterType] = useState("");

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        );
    }, [filterType]);

    useEffect(() => {
        setFilterType("");
        dispatch(
            fetchCategoriesStart()
        );
    }, []);

    const settings = {
        speed: 500,
        rows: 2,
        slidesPerRow: 4,
        adaptiveHeight: true
    };

    return (
        <div className="block block-products-carousel">
            <div className="container">
                <div className="block-header">
                    <h3 class="block-header__title">
                        Featured Products
                    </h3>
                    <div class="block-header__divider"></div>
                    <ul class="block-header__groups-list">
                        <li>
                            <button type="button" onClick={() => setFilterType("")} class={`block-header__group ${filterType == "" && "block-header__group--active"}`}>
                                All
                            </button>
                        </li>

                        {(Array.isArray(categories) && categories.length > 0) && categories.map((category, index) => {
                            return (
                                <li key={index}>
                                    <button type="button" onClick={() => setFilterType(category.categoryName)} class={`block-header__group ${filterType === category.categoryName && "block-header__group--active"}`}>
                                        {category.categoryName}
                                    </button>
                                </li>
                            )
                        })}

                    </ul>
                </div>
                <div className="block-products-carousel__slider">
                    {Array.isArray(data) && data.length < 1 ?
                        (
                            <p>No products.</p>
                        ) :
                        (
                            <div>
                                <Slider {...settings}>
                                    {Array.isArray(data) && data.map((product, pos) => {
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
                                </Slider>
                            </div>)}
                </div>
            </div >
        </div >
    )
}

export default Featured;