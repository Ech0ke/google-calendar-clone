import { useMemo } from "react";
import { useCalendarContext } from "../context/CalendarContext";
import { isBefore, isSameDay, isSameMonth, parse, startOfDay } from "date-fns";
import { useEventsContext } from "../context/EventsContext";
import EventCard from "./EventCard";
import { Event } from "../types/Event";

type DayProps = {
  date: Date;
  weekName?: string;
};

function Day({ date, weekName }: DayProps) {
  const { visibleMonth, setEventDate, setIsEventModalOpen } =
    useCalendarContext();

  const { events } = useEventsContext();

  // Events sorting function
  const sortEvents = (a: Event, b: Event) => {
    // All-day events come first
    if (a.allDay !== b.allDay) {
      return a.allDay ? -1 : 1;
    }

    //When both events are allDay, then sort alpabetically by event name
    if (a.allDay && b.allDay) {
      return a.name.localeCompare(b.name);
    }
    //Parse startTime string into Date
    const aStartTime = parse(a.startTime, "h:mm a", new Date());
    const bStartTime = parse(b.startTime, "h:mm a", new Date());

    // Sort by start time
    return aStartTime.getTime() - bStartTime.getTime();
  };

  //find events taht occour on rendered date
  const matchingEvents = useMemo(
    () => events.filter((event) => isSameDay(event.date, date)),
    [events, date]
  );

  const sortedEvents: Event[] = useMemo(
    () => matchingEvents.slice().sort(sortEvents),
    [matchingEvents]
  );

  const handleEventModalOpen = () => {
    setEventDate(date);
    setIsEventModalOpen(true);
  };
  return (
    <div
      className={`day ${
        !isSameMonth(date, visibleMonth) ? "non-month-day" : ""
      } ${
        isBefore(startOfDay(date), startOfDay(new Date()))
          ? "old-month-day"
          : ""
      }`}
    >
      <div className="day-header">
        {weekName && <div className="week-name">{weekName}</div>}
        <div
          className={`day-number ${isSameDay(date, new Date()) ? "today" : ""}`}
        >
          {date.getDate()}
        </div>
        <button className="add-event-btn" onClick={handleEventModalOpen}>
          +
        </button>
      </div>
      <div className="events">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {/* <div className="events">
        <button className="all-day-event blue event">
          <div className="event-name">Short</div>
        </button>
        <button className="all-day-event green event">
          <div className="event-name">
            Long Event Name That Just Keeps Going
          </div>
        </button>
        <button className="event">
          <div className="color-dot blue"></div>
          <div className="event-time">7am</div>
          <div className="event-name">Event Name</div>
        </button>
      </div> */}
    </div>
  );
}

export default Day;
