import { useEffect, useState } from "react";
import Event from "../components/RowEvent";
import Task from "../components/RowTask";
import Loading from "../components/Loading";
import PrimaryButton from "../components/ButtonPrimary";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { fetchUserEvents, fetchUserTasks } from "../services/api";

const Dashboard = () => {
  const { name: username } = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/logout";
    }
    const id = localStorage.getItem("id");

    Promise.all([fetchUserEvents(id, token), fetchUserTasks(id, token)])
      .then(([eventsData, tasksData]) => {
        setEvents(eventsData);
        setTasks(tasksData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Welcome, {username}</h1>
        <div className="flex gap-2">
          <Link to="/event">
            <PrimaryButton label="Event">
              <FaPlus />
            </PrimaryButton>
          </Link>
          <Link to="/task">
            <PrimaryButton label="Task">
              <FaPlus />
            </PrimaryButton>
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 mb-8">
        <h2 className="text-2xl mb-4">Your Upcoming Events</h2>
        {events.length === 0 && <p>No Events for now</p>}
        {events.map((event, index) => (
          <Event key={event._id} event={event} index={index} />
        ))}
      </div>
      <div className="bg-white p-4">
        <h2 className="text-2xl mb-4">Your Planned Tasks</h2>
        {tasks.length === 0 && <p>No Tasks for now</p>}
        {tasks.map((task, index) => (
          <Task key={task._id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
