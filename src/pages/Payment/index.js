import React from 'react';
import PageHeader from '../../components/PageHeader';
import PaymentDetails from '../../components/PaymentDetails';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { publishableKey } from '../../stripe/config';

const stripePromise = loadStripe(publishableKey);

const Payment = () => {
    const title = "Checkout";

    return (
        <>
            <PageHeader title={title} />
            <Elements stripe={stripePromise}>
                <PaymentDetails />
            </Elements>
        </>
    );
}

export default Payment;