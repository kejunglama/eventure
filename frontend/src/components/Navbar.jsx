import { Link } from "react-router-dom";
import NotificationModal from "../modal/Notifcations";

const Navbar = ({ isAdmin }) => {
  console.log(isAdmin, "isAdmin");
  return (
    <div className="bg-gray-800 text-white p-4 text-center gap-16 flex justify-center">
      <Link to="/">Home</Link>
      {isAdmin && (
        <>
          <Link to="/events">Events</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/users">Users</Link>
        </>
      )}
      <Link to="/profile">Profile</Link>
      <NotificationModal />
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Navbar;
