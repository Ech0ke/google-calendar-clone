import { useState, createContext, useContext } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import EventModal from "./NewEventModal";
import { UnionOmit } from "../types/UnionOmit";
import { Event } from "../types/Event";

const EVENT_COLORS: string[] = ["red", "green", "blue"];

type CalendarContext = {
  visibleMonth: Date;
  visibleDates: Date[];
  setVisibleMonth: React.Dispatch<React.SetStateAction<Date>>;
  eventDate: Date | undefined;
  setEventDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isEventModalOpen: boolean;
  setIsEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  EVENT_COLORS: string[];
};

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
};

const CalendarContext = createContext<CalendarContext | null>(null);
const EventsContext = createContext<EventsContext | null>(null);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context == null) {
    throw new Error("Must use within provider");
  }
  return context;
}

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context == null) {
    throw new Error("Must use within provider");
  }
  return context;
}

function Calendar() {
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const [eventDate, setEventDate] = useState<Date>();
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: UnionOmit<Event, "id">) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      {
        id: crypto.randomUUID(),
        ...event,
      },
    ]);
  };

  return (
    <CalendarContext.Provider
      value={{
        visibleMonth,
        visibleDates,
        setVisibleMonth,
        eventDate,
        setEventDate,
        isEventModalOpen,
        setIsEventModalOpen,
        EVENT_COLORS,
      }}
    >
      <EventsContext.Provider value={{ events, addEvent }}>
        <div className="calendar">
          <CalendarHeader />
          <CalendarBody />

          {/* <div class="modal">
        <div class="overlay"></div>
        <div class="modal-body">
          <div class="modal-title">
            6/8/23
            <button class="close-btn">&times;</button>
          </div>
          <div class="events">
            <button class="all-day-event green event">
              <div class="event-name">Short</div>
            </button>
            <button class="event">
              <div class="color-dot blue"></div>
              <div class="event-time">7am</div>
              <div class="event-name">Event Name</div>
            </button>
            <button class="event">
              <div class="color-dot green"></div>
              <div class="event-time">8am</div>
              <div class="event-name">Event Name</div>
            </button>
            <button class="event">
              <div class="color-dot blue"></div>
              <div class="event-time">9am</div>
              <div class="event-name">Event Name</div>
            </button>
            <button class="event">
              <div class="color-dot blue"></div>
              <div class="event-time">10am</div>
              <div class="event-name">Event Name</div>
            </button>
          </div>
        </div>
      </div> -->

      <!-- <div class="modal">
        <div class="overlay"></div>
        <div class="modal-body">
          <div class="modal-title">
            <div>Add Event</div>
            <small>6/8/23</small>
            <button class="close-btn">&times;</button>
          </div>
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div class="form-group checkbox">
              <input type="checkbox" name="all-day" id="all-day" />
              <label for="all-day">All Day?</label>
            </div>
            <div class="row">
              <div class="form-group">
                <label for="start-time">Start Time</label>
                <input type="time" name="start-time" id="start-time" />
              </div>
              <div class="form-group">
                <label for="end-time">End Time</label>
                <input type="time" name="end-time" id="end-time" />
              </div>
            </div>
            <div class="form-group">
              <label>Color</label>
              <div class="row left">
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  id="blue"
                  checked
                  class="color-radio"
                />
                <label for="blue"><span class="sr-only">Blue</span></label>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  id="red"
                  class="color-radio"
                />
                <label for="red"><span class="sr-only">Red</span></label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  id="green"
                  class="color-radio"
                />
                <label for="green"><span class="sr-only">Green</span></label>
              </div>
            </div>
            <div class="row">
              <button class="btn btn-success" type="submit">Add</button>
              <button class="btn btn-delete" type="button">Delete</button>
            </div>
          </form>
        </div>
      </div> */}
          <EventModal />
        </div>
      </EventsContext.Provider>
    </CalendarContext.Provider>
  );
}

export default Calendar;
