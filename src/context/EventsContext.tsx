import { ReactNode, createContext, useContext, useState } from "react";
import { UnionOmit } from "../types/UnionOmit";
import { Event } from "../types/Event";

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
  editEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  editableEventId: string;
  setEditableEventId: React.Dispatch<React.SetStateAction<string>>;
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
  // state to track event id that is used to pre fill form in case of editing the event.
  // It must be cleared after each action so that when creating a new event, event form stays blank.
  const [editableEventId, setEditableEventId] = useState("");

  const addEvent = (event: UnionOmit<Event, "id">) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      {
        ...event,
        id: crypto.randomUUID(),
      },
    ]);
    setEditableEventId("");
  };

  const editEvent = (event: Event) => {
    const editedEvents = events.map((currentEvent) => {
      if (currentEvent.id === event.id) return { ...event };
      return currentEvent;
    });
    setEvents(editedEvents);
    setEditableEventId("");
  };

  const deleteEvent = (id: string) => {
    const remainingEvents = events.filter(
      (currentEvent) => currentEvent.id !== id
    );
    setEvents(remainingEvents);
    setEditableEventId("");
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
        editableEventId,
        setEditableEventId,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
