import DeleteIcon from "@mui/icons-material/Delete";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: string[];
  removeFromCart: (title: string) => void;
}

const ShoppingCartComponent = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
}: ShoppingCartProps) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{ padding: "16px" }}
    >
      <div className="cart-header">
        <Typography variant="h6">Shopping Cart</Typography>
      </div>
      <Divider />
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFromCart(item)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ListItemAvatar>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ShoppingCartComponent;
