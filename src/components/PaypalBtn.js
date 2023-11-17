// PayPalButton.js

import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';



function CustomPayPalButton({ amount, onSuccess, cartReloadKey, onClick, style }) {
  return (
    <PayPalButton
      amount={amount}
      onSuccess={(data, actions) => {
        if (onSuccess) onSuccess(data, actions);
        if (cartReloadKey) onClick(); // Trigger re-render by calling the onClick function
      }}
      style={style}
    />
  );
}

export default CustomPayPalButton;


// const CustomPayPalButton = ({ amount, onSuccess }) => {
//   return (
//     <PayPalButton
//       amount={amount}
//       onSuccess={(details, data) => onSuccess(details, data)}
//     />
    
//   );
// };

// export default CustomPayPalButton;



// import React from 'react';
// import { PayPalButtons } from '@paypal/react-paypal-js';


// onError={(error) => {
//     console.error('PayPal Error:', error);

//     // Log the entire error object
//     console.log('Full Error Object:', error);

//     // Optionally, log more specific details if available
//     console.log('Error details:', error.details);
//     console.log('Error response:', error.response);
// }}
// onClick={() => setCartReloadKey((prevKey) => prevKey + 1)}