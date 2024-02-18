import { useLocation, useNavigate } from "react-router-dom";
import RowDetail from "../components/RowDetail";
import { deleteUser } from "../services/api";
import { useSnackbar } from "notistack";
import LinkCus from "./LinkCus";
import { FiEdit, FiLock, FiTrash2 } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const User = () => {
  const {
    state: { user },
  } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");
    await deleteUser(user.id, token);
    enqueueSnackbar("User deleted successfully", { variant: "success" });
    navigate("/users");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-4">User Details</h1>
        <div className="flex gap-4">
          <LinkCus to={`/user/${user.id}/change-password`}>
            Change Password
            <FiLock />
          </LinkCus>
          <LinkCus to="/user" state={{ user: user }}>
            Edit
            <FiEdit />
          </LinkCus>
          <button
            className="hover:text-red-700 flex items-center gap-1"
            onClick={handleDelete}
          >
            Delete
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="bg-white p-8">
        <table className="table-auto w-full">
          <tbody>
            <RowDetail label="Username" value={user.username} />
            <RowDetail
              label="Name"
              value={`${user.firstName} ${user.lastName}`}
            />
            <RowDetail label="Email" value={user.email} />
            <RowDetail
              label="Joined"
              value={formatDistanceToNow(new Date(user.createdTimestamp), {
                addSuffix: true,
              })}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
