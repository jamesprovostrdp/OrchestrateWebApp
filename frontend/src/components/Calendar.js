import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar({onDateClick, handleEventClick, events}) {
    return (
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={[onDateClick]}
        events={events}
        eventContent={renderEventContent}
        onEventClick={handleEventClick}
        />
    )
}

function renderEventContent(eventInfo) {
    return(
        <>
        <b>{eventInfo.timeText}</b>
        <b>{eventInfo.event.title}</b>
        </>
    )
}
