import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrderDetails } from '../../redux/Orders/orders.actions';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './styles.scss';

const OrderDetails = ({ order, orderID, orderTotal, back }) => {
    const dispatch = useDispatch();

    const orderItems = order && order.orderItems;

    useEffect(() => {
        return () => {
            dispatch(
                setOrderDetails({})
            );
        }
    }, []);

    const { shippingAdress, billingAdress } = order && order;
    return (
        <>
            <div className="card">
                <div className="order-header">
                    {back &&
                        <div className="order-header__actions">
                            <Link to="/account/orders" className="btn btn-xs btn-secondary">
                                Back to list
                            </Link>
                        </div>
                    }
                    <h5 className="order-header__title">
                        Order #{orderID}
                    </h5>
                    <div className="order-header__subtitle">
                        Was placed on
                        <mark className="order-header__date"> {order.orderCreatedDate && (moment(order.orderCreatedDate.nano).format('DD/MM/YYYY'))} </mark>
                        and is currently
                        <mark className="order-header__status"> On hold</mark>.
                    </div>
                </div>
                <div className="card-divider"></div>
                <div className="card-table">
                    <div className="table-responsive-sm mb-0">
                        <table>
                            <thead>
                                <tr><th>Product</th> <th>Total</th></tr>
                            </thead>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((row, pos) => {
                                    return (
                                        <tr key={pos}>
                                            <td>{row.productName} × {row.quantity}</td>
                                            <td>{row.productPrice * row.quantity} Dhs</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr><th>Total</th> <td>{orderTotal} Dhs</td></tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row mt-3 no-gutters mx-n2">
                <div className="col-sm-6 col-12 px-2">
                    <div className="card address-card address-card--featured">
                        <div className="address-card__body">
                            <div className="address-card__badge address-card__badge--muted">
                                Shipping Address
                            </div>
                            <div className="address-card__name">
                                {order && order.recipientName}
                            </div>
                            <div className="address-card__row">
                                {shippingAdress && (
                                    <>
                                        {shippingAdress.country}
                                        <br />
                                        {shippingAdress.postal_code}, {shippingAdress.city}
                                        <br />
                                        {shippingAdress.line1}, {shippingAdress.line2}
                                    </>
                                )}
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">
                                    Phone Number
                                </div>
                                <div className="address-card__row-content">
                                    {order.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                    <div className="card address-card address-card--featured">
                        <div className="address-card__body">
                            <div className="address-card__badge address-card__badge--muted">
                                Billing Address
                            </div>
                            <div className="address-card__name">
                                {order.recipientName}
                            </div>
                            <div className="address-card__row">
                                {billingAdress && (
                                    <>
                                        {billingAdress.country}
                                        <br />
                                        {billingAdress.postal_code},
                                        {billingAdress.city}
                                        <br />
                                        {billingAdress.line1}, {billingAdress.line2}
                                    </>
                                )}
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">
                                    Phone Number
                                </div>
                                <div className="address-card__row-content">
                                    {order.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default OrderDetails;