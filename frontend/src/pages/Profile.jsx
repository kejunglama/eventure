import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RowDetail from "../components/RowDetail";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    if (!user) {
      navigate("/login");
    }
    setProfile(user);
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString || Date.now());
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const { name, username, createdAt, updatedAt } = profile;

  return (
    <div>
      <h2 className="text-2xl mb-4">Profile Information</h2>
      <div className="bg-white p-4 mb-8">
        <RowDetail label="Name" value={name} />
        <RowDetail label="Username" value={username} />
        <RowDetail label="Created At" value={formatDate(createdAt)} />
        <RowDetail label="Updated At" value={formatDate(updatedAt)} />
      </div>
    </div>
  );
};

export default Profile;
