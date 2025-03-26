import React, { useState } from 'react'; // Import React
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'; // Import Stripe payment
import './PaymentForm.css';  // Import the form CSS file

const PaymentForm = () => {
  // Get Stripe and Elements instances
  const stripe = useStripe();
  const elements = useElements();
  //React useState for handling error messages
  const [error, setError] = useState(null);
  // React useState for handling success messages
  const [message, setMessage] = useState('');

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Ensures Stripe and Elements are available before proceeding
    if (!stripe || !elements) return;

    // Grabs the card details from the CardElement
    const cardElement = elements.getElement(CardElement);

    // Creates a payment method using the card details
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      // Sets the error message when an error occurs
      setError(error.message);
    } else {
      // Send the payment method ID to the backend
      const response = await fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000, paymentMethodId: paymentMethod.id }), // Example: $10.00 in cents (1000)
      });

      // Parse the JSON response from the server
      const { clientSecret } = await response.json();

      // Confirm the payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        // If there is a payment confirmation error, displays the error
        setError(confirmError.message);
      } else {
        // If the payment is successful, update the success message
        if (paymentIntent.status === 'succeeded') {
          setMessage("Payment Successful!");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      {/* Card input field with hidden postal code */}
      <CardElement options={{ hidePostalCode: true }}/>

      {/* Displays error & success messages when needed */}
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}

      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default PaymentForm; // Exports the component to be used throughout the application
