import FilterListIcon from "@mui/icons-material/FilterList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Badge, IconButton, Toolbar, Container } from "@mui/material";
import { useState } from "react";
import SearchBar from "./SearchBar";
import ShoppingCartComponent from "./ShoppingCartComponent";

interface NavBarProps {
  cartItemCount: number;
  cartItems: string[];
  onSearchChange: (searchKeyword: string) => void;
  removeFromCart: (item: string) => void;
}

const NavBar = ({
  cartItemCount,
  cartItems,
  onSearchChange,
  removeFromCart,
}: NavBarProps) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCartDrawer = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <AppBar position="sticky" style={{ top: 0, zIndex: 1000 }}>
      <Container maxWidth="lg">
        <Toolbar>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <SearchBar onSearchChange={onSearchChange} />
            <IconButton color="inherit">
              <FilterListIcon />
            </IconButton>
          </div>
          <IconButton
            color="inherit"
            aria-label="open shopping cart"
            onClick={toggleCartDrawer}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <ShoppingCartComponent
            isOpen={isCartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            cartItemCount={cartItemCount}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
