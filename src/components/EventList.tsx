import "./EventList.scss";
import { EventInfo } from "../types/interfaces";
import { groupEventsByDate } from "./EventList.helper";
import EventCard from "./EventCard";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface EventListProps {
  events: EventInfo[];
  addToCart: (title: string) => void;
  setEvents: React.Dispatch<React.SetStateAction<EventInfo[]>>;
  searchKeyword: string;
}

const EventList = ({
  events,
  addToCart,
  setEvents,
  searchKeyword,
}: EventListProps) => {
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [events, searchKeyword]);

  const eventGroups = useMemo(
    () => groupEventsByDate(filteredEvents),
    [filteredEvents]
  );
  const [stickyDate, setStickyDate] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dateHeadersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStickyDate(entry.target.getAttribute("data-date"));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.01,
    });

    dateHeadersRef.current.forEach((dateHeader) => {
      if (dateHeader) {
        observer.observe(dateHeader);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleAddToCart = (eventTitle: string) => {
    addToCart(eventTitle);
    const updatedEvents = events.filter((e) => e.title !== eventTitle);
    setEvents(updatedEvents);
  };

  return (
    <div ref={containerRef}>
      {eventGroups.map((group, index) => (
        <div className="event-group" key={index}>
          {group.date && (
            <div
              className="date-header"
              ref={(ref) => (dateHeadersRef.current[index] = ref)}
              data-date={
                group.date instanceof Date
                  ? group.date.toDateString()
                  : "To be announced soon"
              }
              style={{
                position: "sticky",
                top: stickyDate ? "4.375rem" : "auto",
                zIndex: stickyDate ? 1 : "auto",
              }}
            >
              {group.date ? group.date.toDateString() : "To be announced soon"}
            </div>
          )}
          <div className="event-list">
            {group.events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                addToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
