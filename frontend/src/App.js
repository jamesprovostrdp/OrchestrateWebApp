// Imports for React, Stripe, and Components within the src folder
import React, { useState } from 'react';
import './css/App.css';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import Calendar from './Calendar';
import EventPopup from './EventPopup';
import './bootstrap.min.css';

import EventSignup from './components/EventSignup';
import NotificationSystem from './components/NotificationSystem';

// Used for Stripe implementation
const stripePromise = loadStripe('pk_test_51R6da3R4C0NESzZKViVuNOnUVPxs3n71XZuijiIuTKCx5wFu7XXeJDKZN2pgrCN94LOMPb3XwkF90SB1aRr91IqH00cGulU19M'); // public key

function App() {

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] =useState(null);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setShowPopup(true);
  };

  const handleSaveEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleEventClick = (arg) => {
    const event = arg.event;
    setSelectedEvent({
      title: event.title,
      start: event.startStr,
    });
    setShowPopup(true)
  }

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
      <h1>Schedule</h1>
      <Calendar
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        events={events}
      />


      {showPopup && (
        <EventPopup
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          onSave={handleSaveEvent}
          onClose={() => {
            setShowPopup(false);
            setSelectedEvent(null);
          }}
        />
      )}

    </div>
  );
}





export default App;