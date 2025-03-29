import React, { useState } from 'react'; // Imports for React and useState

const EventSignup = ({ onSignup }) => {
  const [eventName, setEventName] = useState(''); // Empty state for storing the event name
  const [eventDate, setEventDate] = useState(''); // Empty state for storing the event date

  // Function that is called when the signup button is clicked
  const handleSignup = () => {
    // Returns an alert when name or date are missing upon signup
    if (!eventName || !eventDate) return alert("Please enter event details");
    
    const event = { name: eventName, date: new Date(eventDate) };
    onSignup(event);  // Pass event data to parent component

    // Clears the input fields for name and date after submission
    setEventName('');
    setEventDate('');
  };

  return (
    <div>
      <h2>Sign Up for an Event</h2>

      {/* Event name input field */}
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      {/* Event date input field */}
      <input
        type="datetime-local"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />

      {/* Button to trigger event signup with handleSignup function */}
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default EventSignup; // Exports the component to be used throughout the app
