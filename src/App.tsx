import { Box, CircularProgress, Container } from "@mui/material";
import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";
import EventList from "./components/EventList";
import NavBar from "./components/Header/NavBar";
import { EventInfo } from "./types/interfaces";

const queryClient = new QueryClient();

const App = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const queryKey = "events";

  // Fetch data from the API
  const { data, isLoading, isError, isFetching } = useQuery(
    queryKey,
    async () => {
      const response = await fetch(
        "https://teclead-ventures.github.io/data/london-events.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      return jsonData;
    }
  );

  // Handler to update the searchKeyword state
  const handleSearchChange = (newSearchKeyword: string) => {
    setSearchKeyword(newSearchKeyword);
  };

  // Filter events based on the searchKeyword
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [events, searchKeyword]);

  const addToCart = (eventTitle: string) => {
    setCartItems([...cartItems, eventTitle]);

    const updatedEvents = events.filter((event) => event.title !== eventTitle);
    setEvents(updatedEvents);
  };

  const removeFromCart = (item: string) => {
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));

    // Add the removed event back to the events list
    const removedEvent = data.find((event: EventInfo) => event.title === item);
    if (removedEvent) {
      setEvents([...events, removedEvent]);
    }
  };

  if (isLoading || isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="App">
      <NavBar
        cartItemCount={cartItems.length}
        cartItems={cartItems}
        onSearchChange={handleSearchChange}
        removeFromCart={removeFromCart}
      />
      <Container
        sx={{
          marginTop: "1.5625rem",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EventList
          events={filteredEvents.length > 0 ? events : data}
          addToCart={addToCart}
          setEvents={setEvents}
          searchKeyword={searchKeyword}
        />
      </Container>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default AppWrapper;
