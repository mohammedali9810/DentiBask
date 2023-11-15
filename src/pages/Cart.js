import React from "react";
import { useSelector } from 'react-redux';
import CartItem from './CartItem'
import {BsFillCartPlusFill} from 'react-icons/bs'
import previewImage from './preview.png'; // Import your preview image
import { Link, NavLink } from 'react-router-dom';
import './style.css' 
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
            <div className="row ">
                <div>
                    <h3 className="text-center cart-title"> Shopping Cart <BsFillCartPlusFill/></h3>
                    {cart?.map((item) => (
                        <div className="my-cart-item">
                            <CartItem 

                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price} 
                                quantity={item.quantity}
                                description={item.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
            {cart.length > 0 ? (
                <div className="row text-center m-5 border border-3">
                <h2>Order Summary</h2>
                <h5>the price for all {getTotal().totalQuantity} items is {getTotal().totalPrice} $</h5>
             </div>
            ):(
                // <h1 className="text-center mt-5">Cart is empty</h1>
                 <div className="text-center mt-5">
                <img src={previewImage} alt="Preview" className="img-fluid mb-4" style={{ maxWidth: '300px' }} />
                <h1>Cart is empty</h1>
                <p>Continue shopping and explore our products.</p>
                <NavLink to="/" className="btn btn-primary" onClick={() => console.log('Continue Shopping Clicked')}>
                  Continue Shopping
                </NavLink>

              </div>
            )}
            
        
        </>
    );
}


export default Cart;
