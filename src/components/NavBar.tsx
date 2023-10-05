import FilterListIcon from "@mui/icons-material/FilterList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchAppBar from "./SearchBar";

interface NavBarProps {
  cartItemCount: number;
}

const NavBar = ({cartItemCount}: NavBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SearchAppBar />
          <IconButton color="inherit">
            <FilterListIcon />
          </IconButton>
        </div>
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
