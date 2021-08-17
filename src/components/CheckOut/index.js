import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { removeCartItem, addProduct, reduceCartItem } from '../../redux/Cart/cart.actions';
import { Link } from 'react-router-dom';

import './styles.scss';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
});

const CheckOut = () => {
    const { cartItems, cartTotal } = useSelector(mapState);
    const dispatch = useDispatch();

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        );
    }

    const handleReduceProduct = (product) => {
        dispatch(
            reduceCartItem(product)
        );
    }

    return (
        <div className="cart block">
            <div className="container">
                {cartItems.length > 0 ? (
                    <>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th className="product__image">
                                        Image
                                    </th>
                                    <th>
                                        Product
                                    </th>
                                    <th className="product__price">
                                        Price
                                    </th>
                                    <th className="product__quantity">
                                        Quantity
                                    </th>
                                    <th className="product__total">
                                        Total
                                    </th>
                                    <th aria-label="Remove" ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, pos) => {
                                    return (
                                        <tr key={pos}>
                                            <td className="product__image">
                                                <div className="product-image">
                                                    <Link to={`/product/${item.documentID}`} className="product-image-body">
                                                        <img
                                                            src="https://image.made-in-china.com/2f0j10IYRfDTvPoEou/-Fen-tre-d-039-aluminium-bande-m-t-o-.jpg"
                                                            className="product-image-img" />
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="product__name"><Link to={`/product/${item.documentID}`}>{item.productName}</Link></td>
                                            <td className="product__price">{item.productPrice} Dhs</td>
                                            <td className="input-number product__quantity" aria-label="Quantity">
                                                <div className="input-number">
                                                    <input value={item.quantity} readonly="readonly" step="1" min="1" type="number" className="form-control input-number__input form-control-lg" />
                                                    <div onClick={() => handleAddProduct(item)} className="input-number__add"></div>
                                                    <div onClick={() => handleReduceProduct(item)} className="input-number__sub"></div>
                                                </div>
                                            </td>
                                            <td className="product__total">{item.productPrice * item.quantity} Dhs</td>
                                            <td style={{ width: "1px" }}><button onClick={() => handleRemoveCartItem(item.documentID)} className="btn btn-light btn-sm btn-svg-icon"><TiDeleteOutline size={20} /></button></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                        <div className="cart-actions">
                            <div className="cart-buttons">
                                <Link to="/search" className="btn btn-light btn-lg">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                        <div className="row justify-content-end pt-md-5 pt-4">

                            <div className="col-12 col-md-7 col-lg-6 col-xl-5">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            Cart Totals
                                        </h3>
                                        <table className="cart-total">
                                            <thead>
                                                <tr><th>Subtotal</th> <td>{cartTotal} Dhs</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>
                                                        0.00 Dhs
                                                        <div >
                                                            <a href="/themes/yellow/">
                                                                Calculate Shipping
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Tax</th>
                                                    <td>
                                                        0.00 Dhs
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Total</th> <td>{cartTotal} Dhs</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <Link to="/payment" className="btn btn-primary btn-xl btn-block cart-checkout-button">
                                            Proceed to checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="block-empty-body">
                        <div className="block-empty-message">
                            Your shopping cart is empty!
                        </div>
                        <div className="block-empty-actions">
                            <Link to="/search" className="btn btn-primary btn-sm nuxt-link-active">
                                Continue
                            </Link>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default CheckOut;