import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Product/product.actions';
import './styles.scss';
import ImageGallery from 'react-image-gallery';
import { addProduct } from '../../redux/Cart/cart.actions';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';

const mapState = state => ({
    product: state.productsData.product
});

const images = [
    {
        original: '',
        thumbnail: '',
    }
];

const Product = ({ }) => {
    const { productID } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector(mapState);

    const [quantity, setQuantity] = useState(1);

    const { productName, productPrice, productDesc, productAbout, productImages, productQuantity } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    const handleAddToCart = (product) => {
        if (!product) return;
        const item = {
            product: product,
            amount: quantity
        }
        dispatch(
            addProduct(item)
        );
    };

    const prodImages = (Array.isArray(productImages) && productImages.length > 1) ?
        (productImages.map((item, index) => ({
            ...item,
            original: productImages[index],
            thumbnail: productImages[index]
        }))) : (images);

    return (
        <div className="block">
            <div className="container">
                <div className="product">
                    <div className="product-content">
                        <div className="product-gallery">
                            <ImageGallery showPlayButton={false} items={prodImages} />
                        </div>
                        <div className="product-info">
                            <h1 className="product-name">{productName}</h1>
                            <div className="product-features">
                                <span dangerouslySetInnerHTML={{ __html: productAbout }} />
                            </div>
                            <ul className="product-meta">

                                <li className="product-meta-availability">
                                    Availability:
                                    {(productQuantity > 0) ? (<span className="text-success"> In Stock</span>) : (<span className="text-danger"> Out of Stock</span>)}

                                </li>
                            </ul>
                        </div>
                        <div className="product-sidebar">
                            <div className="product-price">
                                {productPrice} Dhs
                            </div>
                            <div className="product-options">
                                <div className="form-group product-option">
                                    <label for="product-quantity" className="product-option-label">
                                        Quantity
                                    </label>
                                    <div className="product-actions">
                                        <div className="product-actions-item">
                                            <div className="input-number product__quantity" aria-label="Quantity">
                                                <input id="product-quantity" value={quantity} type="number" className="form-control input-number__input form-control-lg" />
                                                <div className="input-number__add" onClick={() => setQuantity(quantity + 1)}></div>
                                                <div className="input-number__sub" onClick={() => quantity > 1 && setQuantity(quantity - 1)}></div>
                                            </div>
                                        </div>
                                        <div className="product-actions-item">
                                            <button onClick={() => handleAddToCart(product)} type="button" className="btn btn-primary btn-lg">
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-tabs">
                    <Tabs className="product-tabs-list container" defaultActiveKey="description">
                        <Tab eventKey="description" title="Description">
                            <div className="prodcut-tab-content">
                                <div className="typography">
                                    <h3>Produt Description</h3>
                                    <span dangerouslySetInnerHTML={{ __html: productDesc }} />
                                </div>

                            </div>
                        </Tab>
                        <Tab eventKey="specification" title="Specification">
                            <div className="prodcut-tab-content">
                                <div className="spec">
                                    <h3 class="spec__header">
                                        Specification
                                    </h3>
                                    <div class="spec__section">
                                        <h4 class="spec__section-title">
                                            General
                                        </h4>
                                        <div class="spec__row">
                                            <div class="spec__name">
                                                Material
                                            </div>
                                            <div class="spec__value">
                                                Aluminium, Plastic
                                            </div>
                                        </div>
                                        <div class="spec__row">
                                            <div class="spec__name">
                                                Engine Type
                                            </div>
                                            <div class="spec__value">
                                                Brushless
                                            </div>
                                        </div>
                                        <div class="spec__row">
                                            <div class="spec__name">
                                                Battery Voltage
                                            </div>
                                            <div class="spec__value">
                                                18 V
                                            </div>
                                        </div>
                                        <div class="spec__row">
                                            <div class="spec__name">
                                                Battery Type
                                            </div>
                                            <div class="spec__value">
                                                Li-lon
                                            </div>
                                        </div>
                                        <div class="spec__row">
                                            <div class="spec__name">
                                                Number of Speeds
                                            </div>
                                            <div class="spec__value">
                                                2
                                            </div>
                                        </div>
                                        <div class="spec__row">
                                            <div class="spec__name">
                                                Charge Time
                                            </div>
                                            <div class="spec__value">
                                                1.08 h
                                            </div>
                                        </div>
                                        <div class="spec__row">
                                            <div class="spec__name">
                                                Weight
                                            </div>
                                            <div class="spec__value">
                                                1.5 kg
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>


            </div>
        </div>
    );
}

export default Product;