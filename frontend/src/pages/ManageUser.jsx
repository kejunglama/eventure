import { useEffect, useState } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import InputText from "../components/InputCus";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { createUser, updateUser } from "../services/api";

const ManageUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("access_token");
  const user = location.state?.user;
  const [userData, setUserData] = useState(
    user
      ? {
          ...user,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
        }
  );

  useEffect(() => {
    console.log("User Data:", userData);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = Object.values(userData).every(
      (field) => field !== ""
    );

    if (!allFieldsFilled) {
      enqueueSnackbar("Please fill all fields!", { variant: "warning" });
      return;
    }

    try {
      if (user) {
        await updateUser(userData, token);
      } else {
        await createUser(userData, token);
      }
    } catch (error) {
      console.error("Error:", error);
      return;
    }

    enqueueSnackbar(`User ${user ? "Updated" : "Created"} Successfully!`, {
      variant: "success",
    });
    navigate("/users");
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  console.log("USer", user);
  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">
        {user ? "Update" : "Create New"} User
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-8">
        <InputText
          label="Username"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <InputText
          label="First Name"
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
        <InputText
          label="Last Name"
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
        <InputText
          label="Email"
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <ButtonPrimary
          label={(user ? "Update" : "Create") + " User"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default ManageUser;
