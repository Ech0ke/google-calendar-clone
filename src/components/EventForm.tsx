import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useEventsContext } from "../context/EventsContext";
import { EVENT_COLORS, Event } from "../types/Event";
import { UnionOmit } from "../types/UnionOmit";
import { format, parse } from "date-fns";
import { prepareEventObject } from "../helpers/prepareEventObject";

type EventFormProps = {
  date?: Date;
  handleClose: () => void;
  editableEvent?: Event;
};

function EventForm({ date, handleClose, editableEvent }: EventFormProps) {
  const { addEvent, editEvent, deleteEvent } = useEventsContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const [isAllDayChecked, setIsAllDayChecked] = useState<boolean>(
    editableEvent?.allDay || false
  );
  const [startTime, setStartTime] = useState<string>(
    editableEvent?.startTime
      ? format(parse(editableEvent.startTime, "h:mm a", new Date()), "HH:mm")
      : ""
  );
  const [endTime, setEndTime] = useState<string>(
    editableEvent?.startTime
      ? format(parse(editableEvent.endTime, "h:mm a", new Date()), "HH:mm")
      : ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    editableEvent?.color || EVENT_COLORS[2]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameRef.current?.value && date) {
      // if (isAllDayChecked) {
      //   const event: UnionOmit<Event, "id"> = {
      //     name: nameRef.current.value,
      //     color: selectedColor,
      //     date: date ,
      //     allDay: true,
      //     startTime: undefined as never,
      //     endTime: undefined as never,
      //   };
      //   addEvent(event);
      // } else {
      //   const event: UnionOmit<Event, "id"> = {
      //     name: nameRef.current.value,
      //     color: selectedColor,
      //     date: date,
      //     allDay: false,
      //     startTime: formatToAMPM(startTime),
      //     endTime: formatToAMPM(endTime),
      //   };
      //   addEvent(event);
      // }
      const event = prepareEventObject({
        id: editableEvent?.id === "" ? undefined : editableEvent?.id,
        name: nameRef.current.value,
        color: selectedColor,
        date: date || new Date(),
        allDay: isAllDayChecked,
        startTime: startTime,
        endTime: endTime,
      });

      if (editableEvent) {
        editEvent(event as Event);
      } else {
        addEvent(event as UnionOmit<Event, "id">);
      }

      handleClose();
    } else {
      throw new Error("Failed to add event, check logic");
    }
  };

  const handleDeleteEvent = () => {
    if (editableEvent) {
      deleteEvent(editableEvent.id);
      handleClose();
    } else {
      throw new Error("Failed to delete the event.");
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
        <input
          type="text"
          name="name"
          id="name"
          ref={nameRef}
          defaultValue={editableEvent?.name}
          required
        />
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
        {!editableEvent ? (
          <button className="btn btn-success" type="submit">
            Add
          </button>
        ) : (
          <>
            <button className="btn btn-success">Save</button>
            <button
              className="btn btn-delete"
              type="button"
              onClick={handleDeleteEvent}
            >
              Delete
            </button>{" "}
          </>
        )}
      </div>
    </form>
  );
}

export default EventForm;
