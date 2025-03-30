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
  const [eventNotification, setEventNotification] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);



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



  return (
    <div className="App">
     
     <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid d-flex align-items-center justify-content-between">

    <a className="navbar-brand text-white" href="#">
      <h1 className="fs-3 mb-0">Orchestrate</h1>
    </a>

    {/* Right-side controls: notification + logout */}
    <div className="d-flex align-items-center">
      
      {/* Notification Icon with Gold Dot */}
      <div style={{ position: 'relative', marginRight: '15px' }}>
        <img
          src="notification.png"
          alt="Notifications"
          style={{ width: '40px', cursor: 'pointer' }}
          onClick={() => {setEventNotification(false);
            setShowNotifications(prev => !prev);
          }}
          />
        
        {eventNotification && (
          <span
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'gold',
              boxShadow: '0 0 5px gold'
            }}
          />
        )}
      </div>


  {showNotifications && (
    <div
      style={{
        position: 'absolute',
        top: '45px',
        right: '0',
        width: '300px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 10,
        padding: '10px',
      }}
    >
      <NotificationSystem events={events} />
    </div>
  )}

      <button type="button" className="btn btn-secondary">
        Log Out
      </button>

    </div>
  </div>
</nav>



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
