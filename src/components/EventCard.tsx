import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { EventInfo } from "../types/interfaces";

interface EventCardProps {
  event: EventInfo;
  addToCart: (title: string) => void;
}

const EventCard = ({ event, addToCart }: EventCardProps) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="event">{event.title[0]}</Avatar>}
        title={event.title}
      />
      <CardMedia
        component="img"
        alt={event.title}
        height="200"
        image={event.flyerFront ?? ""}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <LocationOnIcon /> {event.venue.name}
        </Typography>
        <Typography variant="body2">
          Starts: {event.startTime?.toString()}
        </Typography>
        <Typography variant="body2">
          Ends: {event.endTime?.toString()}
        </Typography>
      </CardContent>
      <IconButton
        color="primary"
        aria-label="add to cart"
        style={{ position: "absolute", bottom: 8, right: 8 }}
        onClick={() => addToCart(event.title)}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </Card>
  );
};

export default EventCard;
