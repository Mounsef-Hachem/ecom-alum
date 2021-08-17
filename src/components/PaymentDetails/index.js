import React, { useState, useEffect } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiInstance } from '../../Utils';
import { selectCartItems, selectCartTotal, selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './../../redux/Cart/cart.actions';
import { useHistory } from 'react-router';

import './styles.scss';

const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
}

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    itemCount: selectCartItemsCount
})

const PaymentDetails = () => {
    const elemnts = useElements();
    const stripe = useStripe();
    const { total, cartItems, itemCount } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [billingAdress, setBillingAddress] = useState({ ...initialAddressState });
    const [shippingAdress, setShippingAddress] = useState({ ...initialAddressState });
    const [recipientFirstName, setRecipientFirstName] = useState("");
    const [recipientLastName, setRecipientLastName] = useState("");
    const [onCardFullName, setOnCardFullName] = useState("");

    useEffect(() => {
        if (itemCount < 1) {
            history.push('/');
        }

    }, [itemCount])

    const handleFormSubmit = async evt => {
        evt.preventDefault();
        const cardElement = elemnts.getElement('card');

        if (
            !shippingAdress.line1 || !shippingAdress.city || !shippingAdress.state || !shippingAdress.postal_code || !shippingAdress.country ||
            !billingAdress.line1 || !billingAdress.city || !billingAdress.state || !billingAdress.postal_code || !billingAdress.country ||
            !recipientFirstName || !recipientLastName || !onCardFullName

        ) return;

        apiInstance.post('/payment/create', {
            amount: total * 100,
            shipping: {
                name: recipientFirstName + " " + recipientLastName,
                address: {
                    ...shippingAdress
                }
            }
        }).then(({ data: clientSecret }) => {
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: onCardFullName,
                    address: {
                        ...billingAdress
                    }
                }

            }).then(({ paymentMethod }) => {
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                })
                    .then(({ paymentIntent }) => {
                        dispatch(clearCart())
                    })
            })
        });

    }

    const handleShipping = e => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAdress,
            [name]: value
        })
    }

    const handleBilling = e => {
        const { name, value } = e.target;
        setBillingAddress({
            ...billingAdress,
            [name]: value
        })
    }

    const configCardElement = {
        iconeStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    }

    return (
        <div className="checkout block ">
            <div className="container">

                <form onSubmit={handleFormSubmit}>

                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-7">
                            <div className="card mb-lg-0">
                                <div className="card-body">
                                    <h3 className="card-title">Shipping address</h3>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="checkout-first-name">First Name</label>
                                            <input required id="checkout-first-name" name="recipientFirstName" onChange={(e) => setRecipientFirstName(e.target.value)} value={recipientFirstName} type="text" placeholder="First Name" className="form-control" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="checkout-last-name">Last Name</label>
                                            <input required id="checkout-last-name" name="recipientLastName" onChange={(e) => setRecipientLastName(e.target.value)} value={recipientLastName} type="text" placeholder="Last Name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-line1">
                                            Line 1
                                        </label>
                                        <input required value={shippingAdress.line1} onChange={e => handleShipping(e)} name="line1" id="checkout-line1" type="text" placeholder="Line 1" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-line2">
                                            Line 2
                                            <span className="text-muted">(Optional)</span>
                                        </label>
                                        <input value={shippingAdress.line2} onChange={e => handleShipping(e)} name="line2" id="checkout-line2" type="text" placeholder="Line 2" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-country">
                                            Country
                                        </label>
                                        <CountryDropdown
                                            required
                                            id="checkout-country"
                                            className="form-select"
                                            valueType="short"
                                            name="country"
                                            value={shippingAdress.country}
                                            onChange={val => handleShipping({ target: { name: 'country', value: val } })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-city">
                                            City
                                        </label>
                                        <input required value={shippingAdress.city} onChange={e => handleShipping(e)} name="city" id="checkout-city" type="text" placeholder="City" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-state">
                                            State
                                        </label>
                                        <input required value={shippingAdress.state} onChange={e => handleShipping(e)} name="state" id="checkout-state" type="text" placeholder="State" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-postal">
                                            Postal Code
                                        </label>
                                        <input required value={shippingAdress.postal_code} onChange={e => handleShipping(e)} name="postal_code" id="checkout-postal" type="text" placeholder="Postal Code" className="form-control" />
                                    </div>
                                </div>
                                <div className="card-divider"></div>
                                <div className="card-body">
                                    <h3 className="card-title">Billing address</h3>
                                    <div className="form-group">
                                        <label for="checkout-fullname">
                                            Full Name
                                        </label>
                                        <input required value={onCardFullName} onChange={(e) => setOnCardFullName(e.target.value)} name="onCardFullName" id="checkout-fullname" type="text" placeholder="Full Name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-line1">
                                            Line 1
                                        </label>
                                        <input required value={billingAdress.line1} onChange={e => handleBilling(e)} name="line1" id="checkout-line1" type="text" placeholder="Line 1" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-line2">
                                            Line 2
                                            <span className="text-muted">(Optional)</span>
                                        </label>
                                        <input value={billingAdress.line2} onChange={e => handleBilling(e)} name="line2" id="checkout-line2" type="text" placeholder="Line 2" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-country">
                                            Country
                                        </label>
                                        <CountryDropdown
                                            required
                                            id="checkout-country"
                                            className="form-select"
                                            valueType="short"
                                            value={billingAdress.country}
                                            name="country"
                                            onChange={val => handleBilling({ target: { name: 'country', value: val } })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-city">
                                            City
                                        </label>
                                        <input required value={billingAdress.city} onChange={e => handleBilling(e)} name="city" id="checkout-city" type="text" placeholder="City" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-state">
                                            State
                                        </label>
                                        <input required value={billingAdress.state} onChange={e => handleBilling(e)} name="state" id="checkout-state" type="text" placeholder="State" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="checkout-postal">
                                            Postal Code
                                        </label>
                                        <input required value={billingAdress.postal_code} onChange={e => handleBilling(e)} name="postal_code" id="checkout-postal" type="text" placeholder="Postal Code" className="form-control" />
                                    </div>
                                </div>
                                <div className="card-divider"></div>
                                <div className="card-body">
                                    <h3 className="card-title">Card details</h3>
                                    <CardElement
                                        options={configCardElement}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                            <div className="card mb-0 sticky-top" >
                                <div className="card-body">
                                    <h3 className="card-title">
                                        Your Order
                                    </h3>
                                    <table className="checkout-totals">
                                        <thead>
                                            <tr><th>Product</th> <th>Total</th></tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, pos) => {
                                                return (
                                                    <tr key={pos}><td>{item.productName} x {item.quantity}</td> <td>{item.productPrice * item.quantity} Dhs</td></tr>
                                                )
                                            })}
                                        </tbody>
                                        <tbody>
                                            <tr><th>Subtotal</th> <td>{total} Dhs</td></tr>
                                            <tr><th>Shipping</th> <td>0.00 Dh</td></tr>
                                            <tr><th>Tax</th> <td>0.00 Dh</td></tr>
                                        </tbody>
                                        <tfoot>
                                            <tr><th>Total</th> <td>{total}Dhs</td></tr>
                                        </tfoot>
                                    </table>
                                    <div className="payment-methods">
                                        <ul>
                                            <li>
                                                <label className="payment-methods__item-header">
                                                    <span className="payment-methods__item-radio input-radio">
                                                        <input type="radio" name="checkout_payment_method" className="form-check-input" value="bank" />
                                                    </span>
                                                    <span className="payment-methods__item-title">
                                                        Direct bank transfer
                                                    </span>
                                                </label>
                                                <div className="payment-methods__item-container">
                                                    <div className="payment-methods__item-description text-muted">
                                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <label className="payment-methods__item-header">
                                                    <span className="payment-methods__item-radio input-radio">
                                                        <input type="radio" name="checkout_payment_method" className="form-check-input" value="cash" />
                                                    </span>
                                                    <span className="payment-methods__item-title">
                                                        Cash on delivery
                                                    </span>
                                                </label>
                                                <div className="payment-methods__item-container">
                                                    <div className="payment-methods__item-description text-muted">
                                                        Pay with cash upon delivery.
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="checkout-agree">
                                        <div className="form-check">
                                            <input id="checkout-terms" type="checkbox" className="form-check-input" />
                                            <label for="checkout-terms" className="form-check-label">
                                                &nbsp;I have read and agree to the website&nbsp;
                                                <a href="#" className="">
                                                    terms and conditions
                                                </a>
                                                &nbsp;*
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-xl btn-block">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default PaymentDetails;