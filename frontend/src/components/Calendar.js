// Imports for the fullcalendar coponents and plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

// Calendar component that accepts onDateClick, handleEventClick, and events
export default function Calendar({onDateClick, onEventClick, events, currentUserId}) {
    return (
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Sets the view to monthly with a day grid
        dateClick={onDateClick}
        events={events} // Pass the events to display on the calendar
        eventContent={renderEventContent}
        eventClick={onEventClick}
        eventDidMount={(info) => {
            const isOwner = info.event.extendedProps.owner === currentUserId;
            if (isOwner) {
              info.el.style.backgroundColor = '#4CAF50'; // green for owner
              info.el.style.borderColor = '#4CAF50';
              info.el.style.color = 'white';
            }}}
        />
    )
}

// Function that renders the event content inside each event cell
function renderEventContent(eventInfo) {
    ///eventInfo.event.setProp("backgroundColor", "red");
    return(
        <>
            {/* Display event time and title */}
            <b>{eventInfo.timeText}</b>
            <b>{eventInfo.event.title}</b>
        </>
    )
}
