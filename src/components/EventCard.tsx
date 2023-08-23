import { Event } from "../types/Event";

function EventCard(event: Event) {
  return (
    <button className="all-day-event blue event">
      <div className="event-name">{event.name}</div>
    </button>
  );
}

export default EventCard;
