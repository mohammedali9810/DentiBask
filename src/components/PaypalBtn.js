// PayPalButton.js

import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const CustomPayPalButton = ({ amount, onSuccess }) => {
  return (
    <PayPalButton
      amount={amount}
      onSuccess={(details, data) => onSuccess(details, data)}
    />
    
  );
};

export default CustomPayPalButton;


// import React from 'react';
// import { PayPalButtons } from '@paypal/react-paypal-js';

// function CustomPayPalButton({ amount, onSuccess, cartReloadKey, onClick, style }) {
//   return (
//     <PayPalButtons
//       amount={amount}
//       onSuccess={(data, actions) => {
//         if (onSuccess) onSuccess(data, actions);
//         if (cartReloadKey) onClick(); // Trigger re-render by calling the onClick function
//       }}
//       style={style}
//     />
//   );
// }

// export default CustomPayPalButton;
