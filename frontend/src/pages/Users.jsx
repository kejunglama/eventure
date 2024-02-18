import { useEffect, useState } from "react";
import { fetchUsersFromKeycloak } from "../services/api";
import Loading from "../components/Loading";
import RowUser from "../components/RowUser";
import ButtonPrimary from "../components/ButtonPrimary";
import { FaPlus } from "react-icons/fa";
import { useSnackbar } from "notistack";

export default function UsersList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access_token");
      const users = await fetchUsersFromKeycloak(token);
      setUsers(users);
      setLoading(false);
    }
    fetchData();
  }, []);

  const registerUser = () => {
    window.location.href = `${
      import.meta.env.VITE_REGISTRATION_URL
    }&redirect_uri=${window.location.origin}/users?registration=success`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const registrationParam = urlParams.get("registration");
    if (registrationParam === "success") {
      enqueueSnackbar("Registration successful", { variant: "success" });
    }
  }, []);

  return (
    <div>
      {loading && <Loading />}

      <div className="flex justify-between">
        <h1 className="text-2xl mb-4">All Users</h1>
        <div className="flex gap-2 mb-2">
          <ButtonPrimary label="User" onClick={registerUser}>
            <FaPlus />
          </ButtonPrimary>
        </div>
      </div>
      <div className="bg-white p-4 mb-8">
        {users.length === 0 && <p>No Users for now</p>}
        {users.map((user, index) => (
          <RowUser key={user.id} user={user} index={index} />
        ))}
      </div>
    </div>
  );
}
