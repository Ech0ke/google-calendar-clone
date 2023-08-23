import { Event } from "../types/Event";

function EventCard(event: Event) {
  if (event.allDay) {
    return (
      <button className={`all-day-event ${event.color} event`}>
        <div className="event-name">{event.name}</div>
      </button>
    );
  } else {
    return (
      <button className="event">
        <div className={`color-dot ${event.color}`}></div>
        <div className="event-time">{event.startTime}</div>
        <div className="event-name">{event.name}</div>
      </button>
    );
  }
}

export default EventCard;
