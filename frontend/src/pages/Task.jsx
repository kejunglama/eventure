import { useLocation, useNavigate } from "react-router-dom";
import RowDetail from "../components/RowDetail";
import { useEffect, useState } from "react";
import LinkCus from "../components/LinkCus";
import Loading from "../components/Loading";
import { deleteTask, fetchUser } from "../services/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useSnackbar } from "notistack";

const Task = () => {
  const {
    state: { task },
  } = useLocation();
  const token = localStorage.getItem("access_token");
  const [assignedName, setAssignedName] = useState("");
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const getAssignedName = async () => {
      const user = await fetchUser(task.assigned, token);
      setAssignedName(user.name);
      setLoading(false);
    };
    getAssignedName();
  }, [task.assigned, token]);

  const handleDeleteTask = async () => {
    try {
      console.log("Task:", task);
      await deleteTask(task.event._id, task._id, token);
      enqueueSnackbar("Task deleted successfully!", { variant: "success" });
      navigate("/tasks");
    } catch (error) {
      console.error("Error Deleting Task:", error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-4">Task Details</h1>
        <div className="flex gap-4">
          <LinkCus to="/task" state={{ task: task }}>
            Edit
            <FiEdit />
          </LinkCus>
          <button
            onClick={handleDeleteTask}
            className="hover:text-red-700 flex items-center gap-1"
          >
            Delete
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="bg-white p-8">
        <table className="table-auto w-full">
          <tbody>
            <RowDetail label="Task Name" value={task.title} />
            <RowDetail
              label="Task Deadline"
              value={new Date(task.deadline).toISOString().split("T")[0]}
            />
            <RowDetail label="Description" value={task.desc} />
            <RowDetail label="Task Assigned" value={assignedName} />
            <RowDetail
              label="Event Name"
              value={task.event.title}
              link={{
                to: `/event/${task.event._id}`,
                state: { event: task.event },
              }}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
