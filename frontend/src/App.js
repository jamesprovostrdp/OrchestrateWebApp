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
import LoginPage from './components/LoginPage';
import RegistrationPage from'./components/RegistrationPage';

// Used for Stripe implementation
const stripePromise = loadStripe('pk_test_51R6da3R4C0NESzZKViVuNOnUVPxs3n71XZuijiIuTKCx5wFu7XXeJDKZN2pgrCN94LOMPb3XwkF90SB1aRr91IqH00cGulU19M'); // public key

function App() {
  // State for managing events, selected dates/events, and popups
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] =useState(null);
  const [notifications, setNotifications] = useState([]); // Used for notification storage
  const [eventNotification, setEventNotification] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);

  // Directs users to login page if they are not yet logedin or else calendar view
  if (!loggedIn) {
    if (register) {
      return <RegistrationPage onBackToLogin={() => setRegister(false)} onLogin={() => setLoggedIn(true)} />;
    } else {
      return (
        <LoginPage
          onLogin={() => setLoggedIn(true)}
          onRegister={() => setRegister(true)}
        />
      );
    }
  }

  // Function to handle clicking on a date within the calendar
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setShowPopup(true);
  };


  // Saves a new event or updates previous to the events state and adds the event to the existing list
  const handleSaveEvent = (newEvent) => {
    setEvents(prevEvents => {
      const isEditing = selectedEvent !== null;
  
      if (isEditing) {
        return prevEvents.map(ev => 
          ev.start === selectedEvent.start ? { ...ev, ...newEvent } : ev
        );
      } else {
        return [...prevEvents, newEvent];
      }
    });

  // Saves a new event to the events state and adds the event to the existing list
  const handleSaveEvent = async (event) => {
    const newEvent = {
      name: event.title,
      date: new Date(event.start).toISOString(), // Ensures correct date format
      amount: event.amount
    };
    
    const databaseSend = await fetch("http://localhost:3001/api/event/create/1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: event.title, start: event.start, end: event.start, payment_amount: event.amount })
    });
    setEvents([...events, newEvent]);
  };

  // Function to handle clicking on an existing event in the calendar, reload event information when selected
  const handleEventClick = (arg) => {
    const event = arg.event;
    setSelectedEvent({
      title: event.title,
      start: event.startStr,
      location: event.extendedProps.location,
      paymentRequired: event.extendedProps.paymentRequired,
      notes: event.extendedProps.notes,
      amount: event.extendedProps.amount
    });
    setShowPopup(true) // Shows the event popup with the event details
  }

  return (
    <div className="App">
      {/* Start of Nav bar */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a className="navbar-brand text-white" href="#">
            <h1 className="fs-3 mb-0">Orchestrate</h1>
          </a>

          <div className="d-flex align-items-center">
            {/* Notification Icon for event reminders */}
            <div style={{ position: 'relative', marginRight: '15px' }}>
              <img 
                src="notification.png" 
                alt="Notifications"
                style={{ width: '40px', cursor: 'pointer' }}
                onClick={() => {
                  setEventNotification(false);
                  setShowNotifications(prev => !prev);
                }}
              />
            </div>

            {/* Notification area where event reminders displays */}
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
    
                <NotificationSystem 
                  events={events} 
                  notifications={notifications} 
                  setNotifications={setNotifications} 
                />
              </div>
            )}

            {/* Logout Button, redirects back to login page */}
            <button type="button" className="btn btn-secondary" onClick={() => setLoggedIn(false)}>Log Out</button>
          </div>
        </div>
      </nav>

      {/* End of nav bar */}

      {/* Calendar display and functionality with clicking on dates and events */}
      <div style={{maxWidth: '90vw', overflowX: 'hidden', margin: '0 auto'}}>
        <div style={{ minWidth: '700px' }}>
          <h1>Schedule</h1>
          <Calendar
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            events={events}
          />
        </div>
      </div>

      {/* Event Popup - Shown when a user clicks on an event */}
      {showPopup && (
        <EventPopup
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          onSave={handleSaveEvent}
          // isOwner={userIsOwner}
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
