import React from 'react';
import CheckOut from '../../components/CheckOut';
import PageHeader from '../../components/PageHeader';

const Cart = ({ }) => {
    const title = "Shopping Cart";

    return (
        <>
            <PageHeader title={title} />
            <CheckOut />
        </>
    );
}

export default Cart;