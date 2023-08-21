import { useCalendarContext } from "../context/CalendarContext";
import Day from "./Day";

function CalendarBody() {
  const { visibleDates } = useCalendarContext();

  const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="days">
      {visibleDates.map((date, index) => (
        <Day key={date.toString()} date={date} weekName={weekNames[index]} />
      ))}
    </div>
  );
}

export default CalendarBody;
