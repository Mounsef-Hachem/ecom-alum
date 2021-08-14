import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Product/product.actions';
import './styles.scss';
import ImageGallery from 'react-image-gallery';
import { addProduct } from '../../redux/Cart/cart.actions';

const mapState = state => ({
    product: state.productsData.product
});

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const Product = ({ }) => {
    const { productID } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector(mapState);

    const { productName, productPrice } = product;

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

        dispatch(
            addProduct(product)
        );
    };

    return (
        <div className="block">
            <div className="container">
                <div className="product">
                    <div className="product-content">
                        <div className="product-gallery">
                            <ImageGallery showPlayButton={false} items={images} />
                        </div>
                        <div className="product-info">
                            <h1 className="product-name">{productName}</h1>
                            <div className="product-features">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                                ornare, mi in ornare elementum, libero nibh lacinia urna, quis
                                convallis lorem erat at purus. Maecenas eu varius nisi.
                            </div>
                            <ul className="product-meta">
                                <li className="product-meta-availability">
                                    Availability:
                                    <span className="text-success"> In Stock</span>
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
                                                <input id="product-quantity" step="1" min="1" type="number" className="form-control input-number__input form-control-lg" />
                                                <div className="input-number__add"></div>
                                                <div className="input-number__sub"></div>
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
                <div className="product-description">
                    <div className="prodcut-description-content">
                        <div className="typography">
                            <h3>Produt Description</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;