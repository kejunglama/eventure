import { useEffect, useState } from "react";
import Event from "../components/RowEvent";
import Loading from "../components/Loading";
import { fetchEvents } from "../services/api";
import { Link } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";
import { FaPlus } from "react-icons/fa";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const data = await fetchEvents(token);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-between">
        <h2 className="text-2xl mb-4">All Upcoming Events</h2>
        <div className="flex gap-2">
          <Link to="/event">
            <ButtonPrimary label="Event">
              <FaPlus />
            </ButtonPrimary>
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 mb-8">
        {events.length === 0 && <p>No Events for now</p>}
        {events.map((event, index) => (
          <Event key={event._id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Events;
