import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart, setProducts } from '../../redux/Product/product.actions';
import ProductCard from '../ProductCard';

import { fetchCategoriesStart } from '../../redux/Categories/categories.actions';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.scss';

const mapState = ({ categoriesData }) => ({
    categories: categoriesData.categories.data
});

const PopularCategories = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(mapState);
    const history = useHistory();
    const [filterType, setFilterType] = useState("");

    useEffect(() => {
        dispatch(
            fetchCategoriesStart()
        );
    }, []);

    return (
        <div className="block block--highlighted block-categories block-categories--layout--compact">
            <div className="container">
                <div className="block-header">
                    <h3 className="block-header__title">
                        Popular Categories
                    </h3>
                    <div className="block-header__divider"></div>
                </div>
                <div className="block-categories__list">
                    {(Array.isArray(categories) && categories.length > 0) && categories.map((category, index) => {
                        return (
                            <div className="block-categories__item category-card category-card--layout--compact">
                                <div className=" category-card__body">
                                    <div className=" category-card__image">
                                        <Link to={`/search/${category.categoryName}`} className="">
                                            <img src={category.categoryThumbnail} alt="" />
                                        </Link>
                                    </div>
                                    <div className=" category-card__content">
                                        <div className=" category-card__name">
                                            <Link to={`/search/${category.categoryName}`} className="">
                                                {category.categoryName}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default PopularCategories;