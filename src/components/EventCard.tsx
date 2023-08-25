import { useCalendarContext } from "../context/CalendarContext";
import { useEventsContext } from "../context/EventsContext";
import { Event } from "../types/Event";

function EventCard(event: Event) {
  const { setEditableEventId } = useEventsContext();
  const { setIsEventModalOpen } = useCalendarContext();

  const handleEditEvent = () => {
    setEditableEventId(event.id);
    setIsEventModalOpen(true);
  };
  if (event.allDay) {
    return (
      <button
        className={`all-day-event ${event.color} event`}
        onClick={handleEditEvent}
      >
        <div className="event-name">{event.name}</div>
      </button>
    );
  } else {
    return (
      <button className="event" onClick={handleEditEvent}>
        <div className={`color-dot ${event.color}`}></div>
        <div className="event-time">{event.startTime}</div>
        <div className="event-name">{event.name}</div>
      </button>
    );
  }
}

export default EventCard;
