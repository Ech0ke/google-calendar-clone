import { createContext, useContext } from "react";

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

export const CalendarContext = createContext<CalendarContext | null>(null);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context == null) {
    throw new Error("Must use within provider");
  }
  return context;
}
