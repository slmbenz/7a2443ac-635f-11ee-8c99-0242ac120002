import FilterListIcon from "@mui/icons-material/FilterList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchBar from "./SearchBar";

interface NavBarProps {
  cartItemCount: number;
  cartItems: string[];
  openCart: () => void;
  onSearchChange: (searchKeyword: string) => void;
}

const NavBar = ({
  cartItemCount,
  cartItems,
  openCart,
  onSearchChange,
}: NavBarProps) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCartDrawer = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <AppBar
      position="sticky"
      style={{
        top: 0,
        zIndex: 1000,
      }}
    >
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
      </Toolbar>
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCartDrawer}>
        <div className="cart-header">
          <Typography variant="h6">Shopping Cart</Typography>
        </div>
        <Divider />
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Event ${item}`} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
