import React, { useState } from 'react';

const EventSignup = ({ onSignup }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSignup = () => {
    if (!eventName || !eventDate) return alert("Please enter event details");
    
    // Convert to Date object for comparison
    const event = { name: eventName, date: new Date(eventDate) };
    onSignup(event);  // Pass event data to parent component

    setEventName('');
    setEventDate('');
  };

  return (
    <div>
      <h2>Sign Up for an Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="datetime-local"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default EventSignup;
