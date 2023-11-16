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