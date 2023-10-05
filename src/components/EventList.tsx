import { EventInfo } from "../types/interfaces";
import EventCard from "./EventCard";
import "./eventList.css";

interface EventListProps {
  events: EventInfo[];
  addToCart: any;
}

const EventList = ({ events, addToCart }: EventListProps) => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {events.map((event, index) => (
        <div
          key={event._id}
          style={{
            flex: `0 0 calc(33.333% - 20px)`,
          }}
        >
          <EventCard event={event} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
};

export default EventList;
