// frontend/src/App.js
import React from 'react';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51R6da3R4C0NESzZKViVuNOnUVPxs3n71XZuijiIuTKCx5wFu7XXeJDKZN2pgrCN94LOMPb3XwkF90SB1aRr91IqH00cGulU19M'); // public key

function App() {
  return (
    <div className="App">
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default App;
