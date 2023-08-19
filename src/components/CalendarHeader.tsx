import { useCalendarContext } from "./Calendar";
import { addMonths, format } from "date-fns";

export default function CalendarHeader() {
  const { visibleMonth, setVisibleMonth } = useCalendarContext();

  const showPreviousMonth = () => {
    setVisibleMonth((currentMonth) => addMonths(currentMonth, -1));
  };

  const showNextMonth = () => {
    setVisibleMonth((currentMonth) => addMonths(currentMonth, 1));
  };

  const showCurrentMonth = () => {
    setVisibleMonth(new Date());
  };
  return (
    <div className="header">
      <button className="btn" onClick={showCurrentMonth}>
        Today
      </button>
      <div>
        <button className="month-change-btn" onClick={showPreviousMonth}>
          &lt;
        </button>
        <button className="month-change-btn" onClick={showNextMonth}>
          &gt;
        </button>
      </div>
      <span className="month-title">{format(visibleMonth, "MMMM yyyy")}</span>
    </div>
  );
}
