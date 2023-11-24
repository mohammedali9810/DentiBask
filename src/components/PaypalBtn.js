import React, { useRef, useEffect, useState } from "react";
import axiosinstance from "../axiosconfig";

export default function Paypal({ onSuccess, onError, onCancel, cart }) {
  const paypal = useRef();
  const [orderid, setOrderid]= useState();
  useEffect(() => {
    if (!window.paypal || !cart) {
      console.error("PayPal script not loaded or cart is undefined.");
      return;
    }


    const createorder = async () => {
      const orderitem_set = await Promise.all(
        cart.map(async (item) => ({
          product_id: item.id,
          quantity: item.quantity,
        }))
      );
      console.log(orderitem_set);
      try {
        const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
        const response = await axiosinstance.post(
          "/User/create_order/",
          {"orderitem_set":orderitem_set} ,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken.data.csrfToken,
              Authorization:
                "Bearer " + localStorage.getItem("dentibask-access-token"),
            },
            withCredentials: true,
          }
        );
        setOrderid(response.data['order_id'])
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    const cancelorder = async ()=>{
      try {console.log("cancel trans");
        const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
        const response = await axiosinstance.patch(
          "/User/cancel_order/",
          {'order_id':orderid} ,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken.data.csrfToken,
              Authorization:
                "Bearer " + localStorage.getItem("dentibask-access-token"),
            },
            withCredentials: true,
          }
        );
    
        console.log(response.data);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }

    const approvedorder = async()=>{
      try {
        console.log("sent trans");
        const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
const response = await axiosinstance.post(
  "/User/add_transaction/",
  {'order_id': orderid},
  {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken.data.csrfToken,
      Authorization: "Bearer " + localStorage.getItem("dentibask-access-token"),
    },
    withCredentials: true,
  }
);

        console.log(response.data);
      } catch (error) {
        console.error("Error creating order:", error);
      }
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
              description: cart
                .map((item) => {
                  console.log(item.quantity);
                  return item.title;
                })
                .join(", "), // Use cart items names as description
              amount: {
                currency_code: "USD",
                value: cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2),
              },
            },
          ],
        };

        console.log("Order data:", orderData); // Add this line for debugging
        createorder();

        return actions.order.create(orderData);
      },

      onApprove: async (data, actions) => {
        // Capture the order when approved
        const order = await actions.order.capture();
        console.log("in on approve")
        approvedorder();
        onSuccess(order);
        
      },
      onError: (err) => {
        console.log(err);
        onError(err);
      },
      onCancel: () => {
        // Handle cancel event
        console.log("Payment canceled by user");
        cancelorder();
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
