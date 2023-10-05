import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: string[];
}

const ShoppingCartComponent = ({ isOpen, onClose, cartItems }: ShoppingCartProps) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
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
  );
};

export default ShoppingCartComponent;
