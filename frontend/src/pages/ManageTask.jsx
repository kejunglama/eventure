import { useEffect, useState } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import InputText from "../components/InputCus";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createTask,
  fetchUsers,
  createNotification,
  updateTask,
  fetchEvents,
} from "../services/api";
import SelectCus from "../components/SelectCus";

const ManageTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("access_token");
  const task = location.state?.task;
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [taskData, setTaskData] = useState(
    task
      ? {
          ...task,
          prevEvent: task.event._id,
          deadline: new Date(task.deadline).toISOString().split("T")[0],
        }
      : {
          title: "",
          desc: "",
          deadline: "",
          event: "",
          assigned: "",
        }
  );

  useEffect(() => {
    const fetchUsersData = async () => {
      const users = await fetchUsers(token);
      setUsers(users);
    };
    const fetchEventsData = async () => {
      const events = await fetchEvents(token);
      setEvents(events);
    };
    fetchUsersData();
    fetchEventsData();
  }, [token]);

  useEffect(() => {
    console.log("Task Data:", taskData);
  }, [taskData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = Object.values(taskData).every(
      (field) => field !== ""
    );

    if (!allFieldsFilled) {
      enqueueSnackbar("Please fill all fields!", { variant: "warning" });
      return;
    }

    try {
      if (task) {
        await updateTask(taskData, token);
      } else {
        await createTask(taskData, token);
      }
    } catch (error) {
      console.error("Error:", error);
      return;
    }

    const notificationDataForParticipants = {
      title: `${
        task
          ? "Updates on the task, you are assigned to:"
          : "You are assigned to:"
      } ${taskData.title}`,
      type: "task",
      users: [taskData.assigned],
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

    enqueueSnackbar(`Task ${task ? "Updated" : "Created"} Successfully!`, {
      variant: "success",
    });
    navigate("/tasks");
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">
        {task ? "Update" : "Create New"} Task
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-8">
        <InputText
          label="Task Title"
          id="title"
          name="title"
          value={taskData.title}
          onChange={handleChange}
        />
        <InputText
          label="Task Description"
          id="desc"
          name="desc"
          type="textarea"
          value={taskData.desc}
          onChange={handleChange}
        />
        <InputText
          label="Deadline"
          id="deadline"
          name="deadline"
          type="date"
          value={taskData.deadline}
          onChange={handleChange}
        />
        <SelectCus
          items={users}
          selectedItem={taskData.assigned}
          handleChange={handleChange}
          label="Assignee"
          name="assigned"
        />

        <SelectCus
          items={events}
          selectedItem={taskData.event._id}
          handleChange={handleChange}
          label="Event"
          name="event"
        />

        <ButtonPrimary
          label={(task ? "Update" : "Create") + " Task"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default ManageTask;
