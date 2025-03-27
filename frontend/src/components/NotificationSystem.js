// Import React, useEffect, and useState
import React, { useEffect, useState } from 'react';

// Component receives an array of events
const NotificationSystem = ({ events }) => {
  const [notifications, setNotifications] = useState([]);

  // useEffect hook that handles event logic for sending notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date(); // Gets the current time

      // Filters events to find the ones coming up within the next 15 minutes
      const upcomingEvents = events.filter(event => {
        const eventTime = new Date(event.date);
        const timeDiff = eventTime - now; // Time difference in milliseconds

        return timeDiff > 0 && timeDiff <= 15 * 60 * 1000; // 15 minutes before event (in milliseconds)
      });

      // Maps the filtered events to the notifications list
      setNotifications(upcomingEvents.map(event => `Reminder: ${event.name} starts soon!`));
    }, 60000); // Runs a check every 60,000 milliseconds (1 minute)

    // Return function to clear the notification interval when the component is updated
    return () => clearInterval(interval);
  }, [events]);

  return (
    <div>
      <h2>Notifications</h2>
      {/* Render the notifications or a message if there are no notifications */}
      {notifications.length > 0 ? (
        notifications.map((note, index) => <p key={index}>{note}</p>) // Display each notification
      ) : (
        <p>No upcoming notifications</p>
      )}
    </div>
  );
};

export default NotificationSystem; // Exports the component to be used throughout the app
