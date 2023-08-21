import { format } from "date-fns";
import { useCalendarContext } from "./Calendar";
import EventForm from "./EventForm";

function EventModal() {
  const { eventDate, isEventModalOpen, setIsEventModalOpen } =
    useCalendarContext();

  const handleClose = () => {
    setIsEventModalOpen(false);
  };
  return (
    isEventModalOpen && (
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Add Event</div>
            <small>{eventDate && format(eventDate, "M/d/yy")}</small>
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
          </div>
          <EventForm date={eventDate} handleClose={handleClose} />
        </div>
      </div>
    )
  );
}

export default EventModal;
