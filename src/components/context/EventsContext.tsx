import { ReactNode, createContext, useContext, useState } from "react";
import { UnionOmit } from "../../types/UnionOmit";
import { Event } from "../../types/Event";

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
};

const EventsContext = createContext<EventsContext | null>(null);

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context == null) {
    throw new Error("Must use within provider");
  }
  return context;
}

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: UnionOmit<Event, "id">) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      {
        id: crypto.randomUUID(),
        ...event,
      },
    ]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
