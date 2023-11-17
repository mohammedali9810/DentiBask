import React, { useRef, useEffect } from "react";

export default function Paypal({ onSuccess, onError, onCancel, cart }) {
  const paypal = useRef();

  useEffect(() => {
    if (!window.paypal || !cart) {
      console.error("PayPal script not loaded or cart is undefined.");
      return;
    }

    const actions = window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "pill",
        label: "checkout",
        height: 40,
      },
      createOrder: (data, actions, err) => {
        // Dynamically set up the order creation on button click
        const orderData = {
          intent: "CAPTURE",
          purchase_units: [
            {
              description: cart.map((item) => item.title).join(", "), // Use cart items names as description
              amount: {
                currency_code: "USD",
                value: cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
              },
            },
          ],
        };
      
        console.log("Order data:", orderData); // Add this line for debugging
      
        return actions.order.create(orderData);
      },
      
      onApprove: async (data, actions) => {
        // Capture the order when approved
        const order = await actions.order.capture();
        console.log(order);
        onSuccess(order);
      },
      onError: (err) => {
        console.log(err);
        onError(err);
      },
      onCancel: () => {
        // Handle cancel event
        console.log("Payment canceled by user");
        if (onCancel) {
          onCancel();
        }
      },
    });

    // Render the buttons
    actions.render(paypal.current);

    // Clean up the PayPal buttons on component unmount
    return () => actions.close();
  }, [onSuccess, onError, onCancel, cart]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
