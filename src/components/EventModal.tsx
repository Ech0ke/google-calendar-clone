import { format } from "date-fns";
import { useCalendarContext } from "../context/CalendarContext";
import EventForm from "./EventForm";
import { useEventsContext } from "../context/EventsContext";
import { useMemo } from "react";

function EventModal() {
  const { eventDate, isEventModalOpen, setIsEventModalOpen } =
    useCalendarContext();

  const { editableEventId, setEditableEventId, events } = useEventsContext();

  const editableEvent = useMemo(
    () => events.find((event) => event.id === editableEventId),
    [editableEventId, events]
  );

  const handleClose = () => {
    setIsEventModalOpen(false);
    setEditableEventId("");
  };
  return (
    isEventModalOpen && (
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>{editableEvent ? "Edit Event" : "Add Event"}</div>
            <small>{eventDate && format(eventDate, "M/d/yy")}</small>
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
          </div>
          <EventForm
            date={eventDate}
            handleClose={handleClose}
            editableEvent={editableEvent}
          />
        </div>
      </div>
    )
  );
}

export default EventModal;
