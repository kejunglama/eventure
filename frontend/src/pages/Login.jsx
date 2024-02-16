import PrimaryButton from "../components/ButtonPrimary";
import InputText from "../components/InputCus";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import Loading from "../components/Loading";
import {
  createUser,
  fetchTokens,
  fetchUserByUsername,
  getUserDetails,
} from "../services/api";
import LinkCus from "../components/LinkCus";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
    const params = new URLSearchParams(location.search);
    if (params.get("registration") === "success") {
      enqueueSnackbar("Registration successful", { variant: "success" });
    }
  }, [navigate, enqueueSnackbar]);

  const fetchUser = async (username, accessToken) => {
    try {
      return await fetchUserByUsername(username, accessToken);
    } catch (error) {
      console.error("Error Fetching User by Username:", error);
      if (error.response && error.response.status === 404) {
        const userDetails = await getUserDetails(accessToken);
        return await createUser(userDetails, accessToken);
      } else {
        throw error;
      }
    }
  };

  const handleLogin = async () => {
    const data = {
      username,
      password,
      grant_type: "password",
      client_id: "web-app",
    };

    try {
      setLoading(true);
      const accessToken = await fetchTokens(data);
      const user = await fetchUser(username, accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("id", user._id);
      setLoading(false);
      enqueueSnackbar("Logged in Successfully!", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Invalid Username or Password", { variant: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loading className="absolute" />}
      <div className="flex justify-around items-center md:space-x-32 mb-32">
        <div>
          <h1 className="text-3xl mb-1">Welcome to Eventure,</h1>
          <h2 className="text-xl">a unified event management platform</h2>
        </div>
        <div className="bg-white p-8 w-96">
          <InputText
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputText
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <div className="flex gap-2">
            <PrimaryButton label="Login" onClick={handleLogin} />
            <LinkCus to="/signup" label="Register" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
