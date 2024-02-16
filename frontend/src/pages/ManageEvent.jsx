import { useEffect, useState } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import InputText from "../components/InputCus";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createEvent,
  fetchUsers,
  createNotification,
  updateEvent,
} from "../services/api";

const ManageEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("access_token");
  const event = location.state?.event;
  const [users, setUsers] = useState([]);
  const [eventData, setEventData] = useState(
    event
      ? {
          ...event,
          date: new Date(event.date).toISOString().split("T")[0],
        }
      : {
          title: "",
          desc: "",
          location: "",
          date: "",
          responsible: "",
          participants: [],
        }
  );

  useEffect(() => {
    const fetchUsersData = async () => {
      const users = await fetchUsers(token);
      setUsers(users);
    };
    fetchUsersData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = Object.values(eventData).every(
      (field) => field !== ""
    );

    if (!allFieldsFilled) {
      enqueueSnackbar("Please fill all fields!", { variant: "warning" });
      return;
    }

    try {
      if (event) {
        await updateEvent(eventData, token);
      } else {
        await createEvent(eventData, token);
      }
    } catch (error) {
      console.error("Error:", error);
      return;
    }

    const notificationDataForParticipants = {
      title: `${
        event
          ? "Updates on the Event, you are invited to:"
          : "You are invited to:"
      } ${eventData.title}`,
      type: "event",
      users: eventData.participants,
    };

    try {
      const notificationResponse = await createNotification(
        notificationDataForParticipants,
        token
      );
      console.log("Notification response:", notificationResponse);
    } catch (error) {
      console.error("Notification error:", error);
    }

    const notificationDataForResponsible = {
      title: `${
        event
          ? "Updates on the Event, you are in charge for:"
          : "You are now in Charge 😉 for:"
      } ${eventData.title}`,
      type: "event",
      users: [eventData.responsible],
    };

    try {
      const notificationResponse = await createNotification(
        notificationDataForResponsible,
        token
      );
      console.log("Notification response:", notificationResponse);
    } catch (error) {
      console.error("Notification error:", error);
    }

    enqueueSnackbar(`Event ${event ? "Updated" : "Created"} Successfully!`, {
      variant: "success",
    });
    navigate("/events");
  };

  const handleChange = (e) => {
    if (e.target.name === "participants") {
      const selectedOptions = [...e.target.selectedOptions].map(
        (option) => option.value
      );
      setEventData({
        ...eventData,
        [e.target.name]: selectedOptions,
      });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };
  console.log(eventData);
  console.log(users);
  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">
        {event ? "Update" : "Create New"} Event
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-8">
        <InputText
          label="Title"
          id="title"
          name="title"
          value={eventData.title}
          onChange={handleChange}
        />
        <InputText
          label="Description"
          id="desc"
          name="desc"
          type="textarea"
          value={eventData.desc}
          onChange={handleChange}
        />
        <InputText
          label="Location"
          id="location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
        />
        <InputText
          label="Date"
          id="date"
          name="date"
          type="date"
          value={eventData.date}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label htmlFor="responsible" className="block mb-2">
            Responsible
          </label>
          <select
            id="responsible"
            name="responsible"
            className="w-full px-3 py-2 border rounded border-gray-300"
            value={eventData.responsible}
            onChange={handleChange}
          >
            <option value="">~ Select responsible</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="participants" className="block mb-2">
            Participants
          </label>
          <select
            id="participants"
            name="participants"
            multiple
            className="w-full px-3 py-2 border rounded border-gray-300"
            value={eventData.participants}
            onChange={handleChange}
          >
            {users.map((participant) => (
              <option key={participant._id} value={participant._id}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>
        <ButtonPrimary
          label={(event ? "Update" : "Create") + " Event"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default ManageEvent;
