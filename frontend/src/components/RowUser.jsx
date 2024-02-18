import { Link } from "react-router-dom";

const RowUser = ({ index, user }) => (
  <Link
    to={`/user/${user.id}`}
    state={{ user }}
    className="hover:text-blue-700"
  >
    <p>
      User {index + 1}: {user.username}
    </p>
  </Link>
);

export default RowUser;
