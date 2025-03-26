// Imports for React, Stripe, and Components within the src folder
import React, { useState } from 'react';
import './css/App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import EventSignup from './components/EventSignup';
import NotificationSystem from './components/NotificationSystem';

// Used for Stripe implementation
const stripePromise = loadStripe('pk_test_51R6da3R4C0NESzZKViVuNOnUVPxs3n71XZuijiIuTKCx5wFu7XXeJDKZN2pgrCN94LOMPb3XwkF90SB1aRr91IqH00cGulU19M'); // public key

function App() {

  // Manages signed-up events
  const [events, setEvents] = useState([]);

  // Function for obtaining and handling event signups
  const handleSignup = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="App">
      {/* Event Signup Component Initialized */ }
      <EventSignup onSignup={handleSignup} />

      {/* Notifications Component Initialized */ }
      <NotificationSystem events={events} />

      {/* Payment System and Payment Form */ }
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default App;
