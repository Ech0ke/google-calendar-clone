import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useCalendarContext } from "./context/CalendarContext";
import { useEventsContext } from "./Calendar";
import { Event } from "../types/Event";
import { UnionOmit } from "../types/UnionOmit";

function EventForm({
  date,
  handleClose,
}: {
  date?: Date;
  handleClose: () => void;
}) {
  const { EVENT_COLORS } = useCalendarContext();
  const { addEvent } = useEventsContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const [isAllDayChecked, setIsAllDayChecked] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(EVENT_COLORS[2]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameRef.current?.value && date) {
      if (startTime === "" && endTime === "" && isAllDayChecked) {
        const event: UnionOmit<Event, "id"> = {
          name: nameRef.current.value,
          color: selectedColor,
          date: date,
          allDay: true,
          startTime: undefined as never,
          endTime: undefined as never,
        };
        addEvent(event);
      } else {
        const event: UnionOmit<Event, "id"> = {
          name: nameRef.current.value,
          color: selectedColor,
          date: date,
          allDay: false,
          startTime: startTime,
          endTime: endTime,
        };
        addEvent(event);
      }
      handleClose();
    } else {
      throw new Error("Failed to add event, check logic");
    }
  };

  const handleIsAllDayChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAllDayChecked(e.target.checked);
    if (!isAllDayChecked) {
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" ref={nameRef} required />
      </div>
      <div className="form-group checkbox">
        <input
          type="checkbox"
          name="all-day"
          id="all-day"
          checked={isAllDayChecked}
          onChange={handleIsAllDayChecked}
        />
        <label htmlFor="all-day">All Day?</label>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            name="start-time"
            id="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required={!isAllDayChecked}
            disabled={isAllDayChecked}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            name="end-time"
            id="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required={!isAllDayChecked}
            disabled={isAllDayChecked}
            min={startTime}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="row left">
          <input
            type="radio"
            name="color"
            value="blue"
            id="blue"
            checked={selectedColor === EVENT_COLORS[2]}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="color-radio"
          />
          <label htmlFor="blue">
            <span className="sr-only">Blue</span>
          </label>
          <input
            type="radio"
            name="color"
            value="red"
            id="red"
            checked={selectedColor === EVENT_COLORS[0]}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="color-radio"
          />
          <label htmlFor="red">
            <span className="sr-only">Red</span>
          </label>
          <input
            type="radio"
            name="color"
            value="green"
            id="green"
            checked={selectedColor === EVENT_COLORS[1]}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="color-radio"
          />
          <label htmlFor="green">
            <span className="sr-only">Green</span>
          </label>
        </div>
      </div>
      <div className="row">
        <button className="btn btn-success" type="submit">
          Add
        </button>
        {/* <button className="btn btn-delete" type="button">
          Delete
        </button> */}
      </div>
    </form>
  );
}

export default EventForm;
