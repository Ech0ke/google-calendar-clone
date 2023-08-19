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

type ContextType = {
  visibleMonth: Date;
  visibleDates: Date[];
  setVisibleMonth: React.Dispatch<React.SetStateAction<Date>>;
};

const Context = createContext<ContextType | null>(null);

export function useCalendarContext() {
  const calendarContext = useContext(Context);
  if (calendarContext == null) {
    throw new Error("Must use within provider");
  }
  return calendarContext;
}

function Calendar() {
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  return (
    <Context.Provider value={{ visibleMonth, visibleDates, setVisibleMonth }}>
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
      </div>
    </Context.Provider>
  );
}

export default Calendar;
