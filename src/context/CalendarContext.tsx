import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { EVENT_COLORS } from "../types/Event";

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

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context == null) {
    throw new Error("Must use within provider");
  }
  return context;
};

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const [eventDate, setEventDate] = useState<Date>();
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

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
      {children}
    </CalendarContext.Provider>
  );
};
