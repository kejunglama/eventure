import { useEffect, useState } from "react";
import Task from "../components/RowTask";
import Loading from "../components/Loading";
import { fetchTasks } from "../services/api";
import { Link } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";
import { FaPlus } from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      const token = localStorage.getItem("access_token");
      const data = await fetchTasks(token);
      setTasks(data);
      setLoading(false);
    };
    getTasks();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-between">
        <h2 className="text-2xl mb-4">All Planned Tasks</h2>
        <div className="flex gap-2">
          <Link to="/task">
            <ButtonPrimary label="Task">
              <FaPlus />
            </ButtonPrimary>
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 mb-8">
        {tasks.length === 0 && <p>No Tasks for now</p>}
        {tasks.map((task, index) => (
          <Task key={task._id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
