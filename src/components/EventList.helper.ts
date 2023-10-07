import { EventInfo } from "../types/interfaces";

export const groupEventsByDate = (events: EventInfo[]) => {
  const eventGroups: { date: Date | undefined; events: EventInfo[] }[] = [];
  const toBeAnnouncedSoon: EventInfo[] = [];

  events.forEach((event) => {
    if (event.startTime) {
      const date = new Date(event.startTime);
      const dateGroup = eventGroups.find((group) =>
        group.date ? group.date.toDateString() === date.toDateString() : false
      );
      if (dateGroup) {
        dateGroup.events.push(event);
      } else {
        eventGroups.push({
          date: date,
          events: [event],
        });
      }
    } else {
      toBeAnnouncedSoon.push(event);
    }
  });

  // Sort the event groups by date
  eventGroups.sort((a, b) => {
    if (!a.date && !b.date) {
      return 0;
    }
    if (!a.date) {
      return 1;
    }
    if (!b.date) {
      return -1;
    }
    return a.date.getTime() - b.date.getTime();
  });

  eventGroups.push({ date: undefined, events: toBeAnnouncedSoon });

  return eventGroups;
};
