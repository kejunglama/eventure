import { Link } from "react-router-dom";

const RowTask = ({ index, task }) => (
  <Link to={`/task/${task._id}`} state={{ task }}>
    <p className="hover:text-blue-700">
      Task {index + 1}: {task.title}
    </p>
  </Link>
);

export default RowTask;
