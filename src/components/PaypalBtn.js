import React, { useRef, useEffect } from "react";
import axiosinstance from "../axiosconfig";
import { useDispatch } from "react-redux";
import { resetItem } from "../store/slices/cartslice";

export default function Paypal({ onSuccess, onError, onCancel, cart }) {
  const dispatch = useDispatch();
  const paypal = useRef();
  const orderid = useRef();

  const resetlist = () => {
    dispatch(resetItem());
  };

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
          { "orderitem_set": orderitem_set },
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
        console.log("the order id is:" + response.data['order_id']);
        orderid.current = response.data['order_id'];
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    const cancelorder = async () => {
      try {
        console.log("cancel trans");
        const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
        const response = await axiosinstance.patch(
          "/User/cancel_order/",
          { 'order_id': orderid.current },
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
    };

    const approvedorder = async () => {
      try {
        console.log("sent trans");
        const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
        console.log("the order id is:" + orderid.current);
        const response = await axiosinstance.post(
          "/User/add_transaction/",
          { 'order_id': orderid.current },
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
    };

    const actions = window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "pill",
        label: "checkout",
        height: 40,
      },
      createOrder: (data, actions, err) => {
        const orderData = {
          intent: "CAPTURE",
          purchase_units: [
            {
              description: cart
                .map((item) => {
                  console.log(item.quantity);
                  return item.title;
                })
                .join(", "),
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
        createorder();
        return actions.order.create(orderData);
      },

      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        approvedorder();
        resetlist();
        onSuccess(order);
      },
      onError: (err) => {
        console.log(err);
        onError(err);
      },
      onCancel: () => {
        console.log("Payment canceled by user");
        cancelorder();
      },
    });
    actions.render(paypal.current);
    return () => actions.close();
  }, [onSuccess, onError, onCancel, cart]);

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", alignItems:"center"}}>
      <div style={{width:"50%"}} ref={paypal}></div>
    </div>
  );
}
