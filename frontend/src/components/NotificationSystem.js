// Import React
import React from 'react';

// Component receives an array of events
const NotificationSystem = ({ notifications }) => {
  return (
    <div>
      <h2>Notifications</h2>
      {/* Render the notifications or a message if there are no notifications */}
      {notifications.length > 0 ? (
        notifications.map((notif, index) => <p key={index}>{notif}</p>) // Display each notification
      ) : (
        <p>No upcoming notifications</p>
      )}
    </div>
  );
};

export default NotificationSystem; // Exports the component to be used throughout the app
