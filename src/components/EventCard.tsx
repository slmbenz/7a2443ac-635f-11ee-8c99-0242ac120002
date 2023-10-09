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
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return new Date(date).toLocaleString("de-DE", options).replace(",", "");
  };

  return (
    <Card
      style={{ height: 400, position: "relative", marginBottom: "1rem", maxWidth: "380px" }}
    >
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
          style={{ display: "flex", alignItems: "left" }}
        >
          <LocationOnIcon />
          <a
            href={event.venue.direction}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "5px" }}
          >
            {event.venue.name}
          </a>
        </Typography>
        <Typography
          variant="body2"
          style={{ display: "flex", alignItems: "left" }}
        >
          | Starts: {formatDate(event.startTime)}
        </Typography>
        <Typography
          variant="body2"
          style={{ display: "flex", alignItems: "left" }}
        >
          | Ends: {formatDate(event.endTime)}
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
