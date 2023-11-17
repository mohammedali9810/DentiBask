import React, { useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import CartItem from './CartItem';
import { BsFillCartPlusFill } from 'react-icons/bs';
import previewImage from './preview.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './style.css';
import { CLIENT_ID } from '../Config/Config';
import Paypal from "../components/PaypalBtn";
import { toast } from 'react-toastify';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [cartReloadKey, setCartReloadKey] = useState(0);

  const handlePaymentSuccess = (order) => {
    console.log("Payment successful:", order);
    toast.success("Payment successful! Thank you for your purchase.");
    setCartReloadKey((prevKey) => prevKey + 1);
  };

  const handlePaymentError = (error) => {
    console.error("Error processing payment:", error);
    toast.error("An error occurred while processing the payment.");
  };

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <div>
      <div className="row">
        <div>
          <h3 className="text-center cart-title">
            Shopping Cart <BsFillCartPlusFill />
          </h3>
          {cart?.map((item, index) => (
            <div key={item.id} className={index === cart.length - 1 ? 'last-child' : ''}>
              <CartItem
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
          <h5>
            The price for all {getTotal().totalQuantity} items is {getTotal().totalPrice} $
          </h5>
          <Paypal cart={cart} onSuccess={handlePaymentSuccess} onError={handlePaymentError}  />
        </div>
      ) : (
        <div className="text-center mt-5">
          <img src={previewImage} alt="Preview" className="img-fluid mb-4" style={{ maxWidth: '300px' }} />
          <h1>Cart is empty</h1>
          <p>Continue shopping and explore our products.</p>
          <NavLink to="/" className="btn btn-primary" onClick={() => console.log('Continue Shopping Clicked')}>
            Continue Shopping
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Cart;


