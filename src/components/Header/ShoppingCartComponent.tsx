import DeleteIcon from "@mui/icons-material/Delete";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: string[];
  removeFromCart: (title: string) => void;
  cartItemCount: number;
}

const ShoppingCartComponent = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  cartItemCount,
}: ShoppingCartProps) => {
  const [cartTitle, setCartTitle] = useState("Attending Events");

  useEffect(() => {
    if (cartItemCount === 0) {
      setCartTitle("No Events Selected");
    } else {
      setCartTitle("Attending Events");
    }
  }, [cartItemCount, onClose]);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="cart-header" style={{ marginLeft: "0.125rem" }}>
        <Typography variant="h6">{cartTitle}</Typography>
      </div>
      <Divider />
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeFromCart(item)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ShoppingCartComponent;
