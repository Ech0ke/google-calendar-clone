import React, { useMemo } from "react";
import { useCalendarContext } from "../context/CalendarContext";
import { isBefore, isSameDay, isSameMonth, startOfDay } from "date-fns";
import { useEventsContext } from "../context/EventsContext";
import EventCard from "./EventCard";

type DayProps = {
  date: Date;
  weekName?: string;
};

function Day({ date, weekName }: DayProps) {
  const { visibleMonth, setEventDate, setIsEventModalOpen } =
    useCalendarContext();

  const { events } = useEventsContext();

  //find events taht occour on rendered date
  const matchingEvents = useMemo(
    () => events.filter((event) => isSameDay(event.date, date)),
    [events, date]
  );

  console.log("Matched events: ", matchingEvents);

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
        {matchingEvents.map((event) => (
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
