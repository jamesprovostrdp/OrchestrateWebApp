// Import React, useEffect, and useState
import React, { useEffect } from 'react';

// Component receives an array of events
const NotificationSystem = ({ events, notifications, setNotifications }) => {

  // useEffect hook that handles event logic for sending notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date(); // Gets the current time

      // Filters events to find the ones coming up within the next 15 minutes
      const upcomingEvents = events.filter(event => {
        const eventTime = new Date(event.date);
        const timeDiff = (eventTime - now) / (60 * 1000); // Time difference in minutes

        return timeDiff > 0 && timeDiff <= 15; // Events 15 minutes before event are taken
      });

      // Maps the filtered events to the notifications list
      setNotifications(prev => {
        const newNotifications = upcomingEvents
          .map(event => `Reminder: ${event.name} starts soon!`)
          .filter(notif => !prev.includes(notif));

        // Remove notifications for events that have passed
        const activeNotifications = prev.filter(notif => {
          const eventName = notif.replace('Reminder: ', '').replace(' starts soon!', '');
          return upcomingEvents.some(event => event.name === eventName && new Date(event.date) > now);
        });

        return [...activeNotifications, ...newNotifications]
      })
    
    }, 10 * 1000); // Runs a check for new events every 10 seconds

    // Return function to clear the notification interval when the component is updated
    return () => clearInterval(interval);
  }, [events, setNotifications]);

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
