// Imports for React, Stripe, and Components within the src folder
import React, { useState } from 'react';
import './css/App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import Calendar from './components/Calendar';
import EventPopup from './components/EventPopup';
import './css/bootstrap.min.css';
import EventSignup from './components/EventSignup';
import NotificationSystem from './components/NotificationSystem';

// Used for Stripe implementation
const stripePromise = loadStripe('pk_test_51R6da3R4C0NESzZKViVuNOnUVPxs3n71XZuijiIuTKCx5wFu7XXeJDKZN2pgrCN94LOMPb3XwkF90SB1aRr91IqH00cGulU19M'); // public key

function App() {
  // State for managing events, selected dates/events, and popups
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] =useState(null);

  // Function to handle clicking on a date within the calendar
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setShowPopup(true);
  };

  // Saves a new event to the events state and adds the event to the existing list
  const handleSaveEvent = (event) => {
    setEvents([...events, event]);
  };

  // Function to handle clicking on an existing event in the calendar
  const handleEventClick = (arg) => {
    const event = arg.event;
    setSelectedEvent({
      title: event.title,
      start: event.startStr,
      location: event.extendedProps.location,
      paymentRequired: event.extendedProps.paymentRequired
    });
    setShowPopup(true) // Shows the event popup with the event details
  }

  // Function for obtaining and handling event signups
  const handleSignup = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="App">
      {/* Event Signup Component Initialized */ }
      {/* <EventSignup onSignup={handleSignup} /> */}

      {/* Notifications Component Initialized */ }
      <NotificationSystem events={events} />

   {/* Payment System and Payment Form */ }
      {/* <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements> */}

      {/* Calendar Component - Displays event schedule */}
      <h1>Schedule</h1>
      <Calendar
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        events={events}
      />

      {/* Event Popup - Shown when a user clicks on an event */}
      {showPopup && (
        <EventPopup
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          onSave={handleSaveEvent}
          onClose={() => {
            setShowPopup(false); // Hides the popup
            setSelectedEvent(null); // Clears the selected event
          }}
        />
      )}
    </div>
  );
}

export default App; // Exports the App component to be used throughout the application
