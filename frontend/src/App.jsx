import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Event from "./pages/Event";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Task from "./pages/Task";
import Events from "./pages/Events";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import ManageEvent from "./pages/ManageEvent";
import ManageTask from "./pages/ManageTask";
import Users from "./pages/Users";

// ... other imports ...

const App = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="font-Arial min-h-screen bg-gray-200">
      {user ? (
        <>
          <Navbar />
          <div className="container mx-auto px-16 mt-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/event" element={<ManageEvent />} />
              <Route path="/task" element={<ManageTask />} />
              <Route path="/events" element={<Events />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/event/:id" element={<Event />} />
              <Route path="/task/:id" element={<Task />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
