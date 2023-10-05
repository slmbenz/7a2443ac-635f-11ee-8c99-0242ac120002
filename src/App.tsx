import { Box, CircularProgress, Container, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";
import EventList from "./components/EventList";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

function App() {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const queryKey = "events";

  const { data, isLoading, isError, isFetching } = useQuery(queryKey, () =>
    axios
      .get("https://teclead-ventures.github.io/data/london-events.json")
      .then((response) => response.data)
  );

  const addToCart = (eventTitle: string) => {
    setCartItems([...cartItems, eventTitle]);
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
      <NavBar cartItemCount={cartItems.length} />
      <Container>
        <Grid
          container
          spacing={3}
          style={{
            padding: "35px",
          }}
        >
          {data && <EventList events={data} addToCart={addToCart} />}
        </Grid>
      </Container>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default AppWrapper;
