// Imports for React, Stripe, and Components within the src folder
import React, { useState, useEffect } from 'react';
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
  const [userObjectID, setUserID] = useState("");


  const getEvents = async (userID) => {

    // Get Owned Events from user ID
    const databaseSend = await fetch(`http://localhost:3001/api/event/owned/${userID}`);

    // Parse owned events
    const eventsOwned = await databaseSend.json();

    // Get Joined Events from user ID
    const databaseSendJ = await fetch(`http://localhost:3001/api/event/joined/${userID}`);

    // Parse joined events
    const eventsJoined = await databaseSendJ.json();

    // Combine both events to one array
    const events = eventsOwned.events.concat(eventsJoined.events);

    // Set events if results gained
    if (databaseSend.status === 200 || databaseSend.status === 404) {
      setEvents(events);
    }
    else {
      setEvents([]);
      return;
    }
  }

  	const sendEventToEmail = async (emailAndEvent) => {

		const databaseGetUserID = await fetch(`http://localhost:3001/api/user/info`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
			{
				email: emailAndEvent.email
			})
		});

		const collectedUser = await databaseGetUserID.json();

		console.log(emailAndEvent.event);
		const databaseSend = await fetch(`http://localhost:3001/api/event/join/${collectedUser.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
			{ 
				event_id: emailAndEvent.event
			})
		});

		return;
	};

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
  
      // Filter events happening within the next 15 minutes
      const upcomingEvents = events.filter(event => {
        const eventTime = new Date(event.start);
        const timeDiff = (eventTime - now) / (60 * 1000);
        return timeDiff > 0 && timeDiff <= 15;
      });
  
      // Add new notifications and remove past ones
      setNotifications(prev => {
        const newNotifications = upcomingEvents
          .map(event => `Reminder: ${event.title} starts soon!`)
          .filter(notif => !prev.includes(notif));
  
        const activeNotifications = prev.filter(notif => {
          const eventName = notif.replace('Reminder: ', '').replace(' starts soon!', '');
          return upcomingEvents.some(event => event.name === eventName && new Date(event.date) > now);
        });
  
        return [...activeNotifications, ...newNotifications];
      });
  
    }, 10 * 1000);
  
    return () => clearInterval(interval);
  }, [events]); // Runs whenever `events` change

  // Directs users to login page if they are not yet logedin or else calendar view
  if (!loggedIn) {
    if (register) {
      return <RegistrationPage onBackToLogin={() => setRegister(false)} onLogin={() => setLoggedIn(true)} />;
    } else {
      return (
        <LoginPage
          onLogin={(userID) => {
            setLoggedIn(true);
            setUserID(userID);
            getEvents(userID);
          }}
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

  // Saves a new event to the events state and adds the event to the existing list
  const handleSaveEvent = async (event) => {

	// Send event to database
	const databaseSend = await fetch(`http://localhost:3001/api/event/create`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(
		{ 
			title: event.title,
			start: event.start, 
			end: event.end, 
			payment_amount: event.amount,
			notes: event.notes,
			location: event.location,
			id: userObjectID
		})
	});

	// Save event in events if successful
	if (databaseSend.status === 201) {
		setEvents(prevEvents => {

			if (selectedEvent !== null) {
				return prevEvents.map(ev => 
					ev.start === selectedEvent.start ? { ...ev, ...event } : ev
				);
			} else {
				return [...prevEvents, event];
			}
		});

		getEvents(userObjectID);
		return;
	}
	else {
		return;
	}
  };

  // Function to handle clicking on an existing event in the calendar, reload event information when selected
  const handleEventClick = (arg) => {
    const event = arg.event;
	console.log(event);
    setSelectedEvent({
      title: event.title,
      start: event.startStr,
      end: event.endStr, 
      location: event.extendedProps.location,
      notes: event.extendedProps.notes,
      paymentRequired: event.extendedProps.payment_required,
      payment_amount: event.extendedProps.payment_amount,
	  id: event.extendedProps._id
    });
    setShowPopup(true);
  };
  

  return (
    <div className="App">
      {/* Start of Nav bar */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <h1 className="fs-3 mb-0">Orchestrate</h1>

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
            currentUserId={userObjectID}
          />
        </div>
      </div>




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
		  sendEventToEmail={sendEventToEmail}
          // isReadOnly={selectedEvent !==null}
        />
      )}
    </div>
  );
};

export default App; // Exports the App component to be used throughout the application
