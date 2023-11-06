import React from "react";
import { useSelector } from 'react-redux';
import CartItem from './CartItem'
function Cart() {
    const cart = useSelector((state) => state.cart)

    const getTotal = () => {
        let totalQuantity = 0
        let totalPrice = 0
        cart.forEach(item => {
            totalQuantity += item.quantity
            totalPrice += item.price * item.quantity
    })
    return {totalPrice, totalQuantity}
    }
    return (
        <>
            <div className="row">
                <div>
                    <h3>Shopping Cart</h3>
                    {cart?.map((item) => (
                    <CartItem
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price} 
                        quantity={item.quantity}
                    />
                    ))}
                </div>
            </div>
            {cart.length > 0 ? (
                <div className="row text-center m-5 border border-3">
                <h2>Order Summary</h2>
                <h5>the price for all {getTotal().totalQuantity} items is {getTotal().totalPrice} $</h5>
             </div>
            ):(
                <h1 className="text-center">Cart is empty</h1>
            )}
            
        
        </>
    );
}


export default Cart;