import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      // Send the payment method ID to the server
      const response = await fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000, paymentMethodId: paymentMethod.id }), // Example: $10.00 in cents
      });

      const { clientSecret } = await response.json();

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setError(confirmError.message);
      } else {
        if (paymentIntent.status === 'succeeded') {
          setMessage("Payment Successful!");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }}/>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default PaymentForm;
