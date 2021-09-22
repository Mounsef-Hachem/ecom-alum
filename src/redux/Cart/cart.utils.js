export const existingCartItem = ({
    prevCartItems,
    product
}) => {
    return prevCartItems.find(
        cartItem => cartItem.documentID === product.documentID
    );
};

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const { product, amount } = nextCartItem;
    const cardItemExists = existingCartItem({ prevCartItems, product });

    if (cardItemExists) {
        return prevCartItems.map(cartItem => cartItem.documentID == product.documentID
            ? {
                ...cartItem,
                quantity: cartItem.quantity + amount
            } : cartItem
        );
    }

    return [
        ...prevCartItems,
        {
            ...product,
            quantity: amount
        }
    ];
};

export const handleRemoveCartItem = ({
    prevCartItems,
    cartItemToRemove
}) => {
    return prevCartItems.filter(item => item.documentID !== cartItemToRemove.documentID);
};

export const handleReduceCartItem = ({
    prevCartItems,
    cartItemToReduce
}) => {
    const existingCartItem = prevCartItems.find(cartItem =>
        cartItem.documentID === cartItemToReduce.documentID);

    if (existingCartItem.quantity === 1) {
        return prevCartItems.filter(
            cartItem => cartItem.documentID !== existingCartItem.documentID
        );
    }

    return prevCartItems.map(cartItem =>
        cartItem.documentID === existingCartItem.documentID ? {
            ...cartItem,
            quantity: cartItem.quantity - 1
        } : cartItem);
};