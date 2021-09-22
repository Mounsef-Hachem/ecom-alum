import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/Cart/cart.actions';

const ProductCard = (product) => {
    const dispatch = useDispatch();

    const {
        documentID,
        productImages,
        productName,
        productPrice
    } = product;

    if (!documentID || !productImages || !productName || typeof productPrice === 'undefined') return null;

    const handleAddToCart = (product) => {
        if (!product) return;
        const item = {
            product: product,
            amount: 1
        }
        dispatch(
            addProduct(item)
        );
    };

    return (
        <div className="product-card">

            <div className="product-card-image">
                <Link to={`/product/${documentID}`} className="product-image-body">
                    <img
                        src={productImages[0]}
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