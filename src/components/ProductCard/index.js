import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/Cart/cart.actions';

const ProductCard = (product) => {
    const dispatch = useDispatch();

    const {
        documentID,
        productThumbnail,
        productName,
        productPrice
    } = product;

    if (!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined') return null;

    const handleAddToCart = (product) => {
        if (!product) return;

        dispatch(
            addProduct(product)
        );
    };

    return (
        <div className="product-card">

            <div className="product-card-image">
                <Link to={`/product/${documentID}`} className="product-image-body">
                    <img
                        src="https://image.made-in-china.com/2f0j10IYRfDTvPoEou/-Fen-tre-d-039-aluminium-bande-m-t-o-.jpg"
                        className="product-image-img" />
                </Link>
            </div>
            <div className="product-card-info">
                <div className="product-card-name">
                    <Link to={`/product/${documentID}`}>
                        {productName}
                    </Link>
                </div>
            </div>
            <div className="product-card-actions">
                <div className="product-card-price">
                    {productPrice} DHs
                </div>
                <div className="product-card-buttons">
                    <button onClick={() => handleAddToCart(product)} type="button" className="btn btn-primary product-card-addtocart">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;