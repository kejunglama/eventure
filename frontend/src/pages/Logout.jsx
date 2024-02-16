import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ["access_token", "refresh_token", "id", "user"].forEach((item) =>
      localStorage.removeItem(item)
    );
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
