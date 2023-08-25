import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import EventModal from "./EventModal";
import { CalendarProvider } from "../context/CalendarContext";
import { EventsProvider } from "../context/EventsContext";

function Calendar() {
  return (
    <CalendarProvider>
      <EventsProvider>
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
      </EventsProvider>
    </CalendarProvider>
  );
}

export default Calendar;
