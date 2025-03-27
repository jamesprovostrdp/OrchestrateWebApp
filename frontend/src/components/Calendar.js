// Imports for the fullcalendar coponents and plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

// Calendar component that accepts onDateClick, handleEventClick, and events
export default function Calendar({onDateClick, handleEventClick, events}) {
    return (
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Sets the view to monthly with a day grid
        dateClick={[onDateClick]}
        events={events} // Pass the events to display on the calendar
        eventContent={renderEventContent}
        onEventClick={handleEventClick}
        />
    )
}

// Function that renders the event content inside each event cell
function renderEventContent(eventInfo) {
    return(
        <>
            {/* Display event time and title */}
            <b>{eventInfo.timeText}</b>
            <b>{eventInfo.event.title}</b>
        </>
    )
}
