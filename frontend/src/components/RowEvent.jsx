import { Link } from "react-router-dom";

const RowEvent = ({ index, event }) => (
  <Link to={`/event/${event._id}`} state={{ event }}>
    <p className="hover:text-blue-700">
      Event {index + 1}: {event.title} - Date:{" "}
      {new Date(event.date).toISOString().split("T")[0]}
    </p>
  </Link>
);

export default RowEvent;
