import { useEffect, useState } from "react";
import { fetchUsersFromKeycloak } from "../services/api";
import Loading from "../components/Loading";
import RowUser from "../components/RowUser";

export default function NotUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access_token");
      const users = await fetchUsersFromKeycloak(token);
      setUsers(users);
      console.log(users);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-4">Users</h1>
        <div className="flex gap-4"></div>
      </div>
      <div className="bg-white p-8">
        <table className="table-auto w-full">
          <tbody>
            {users.map((user, index) => (
              <RowUser key={user.id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
