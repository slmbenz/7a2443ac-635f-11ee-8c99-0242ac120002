import { Box, CircularProgress, Container } from "@mui/material";
import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";
import EventList from "./components/EventList";
import NavBar from "./components/Header/NavBar";
import ShoppingCartComponent from "./components/Header/ShoppingCartComponent";
import { EventInfo } from "./types/interfaces";

const queryClient = new QueryClient();

const App = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
  const handleSearchChange = (searchKeyword: string) => {
    setSearchKeyword(searchKeyword);
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
  console.log("Updated Events:", events);
  const removeFromCart = (item: string) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(updatedCart);
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
        openCart={() => setIsCartOpen(true)}
        onSearchChange={handleSearchChange}
      />
      <Container sx={{ marginTop: "1.5625rem", padding: "1rem" }}>
        {data && (
          <EventList
            events={filteredEvents.length > 0 ? events : data}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            setEvents={setEvents}
            searchKeyword={searchKeyword}
          />
        )}
      </Container>
      <ShoppingCartComponent
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
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
