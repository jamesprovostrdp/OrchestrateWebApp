import React, { useEffect, useState } from 'react';

const NotificationSystem = ({ events }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const upcomingEvents = events.filter(event => {
        const eventTime = new Date(event.date);
        const timeDiff = eventTime - now; // Difference in milliseconds

        return timeDiff > 0 && timeDiff <= 15 * 60 * 1000; // 15 minutes before event (in milliseconds)
      });

      setNotifications(upcomingEvents.map(event => `Reminder: ${event.name} starts soon!`));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((note, index) => <p key={index}>{note}</p>)
      ) : (
        <p>No upcoming notifications</p>
      )}
    </div>
  );
};

export default NotificationSystem;
