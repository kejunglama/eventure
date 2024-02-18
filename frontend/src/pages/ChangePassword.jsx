import { useState } from "react";
import InputText from "../components/InputCus";
import ButtonPrimary from "../components/ButtonPrimary";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { changePassword } from "../services/api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      enqueueSnackbar("New passwords do not match!", { variant: "error" });
      return;
    }

    await changePassword(id, passwordData.confirmNewPassword, token);
    navigate(`/users`);

    enqueueSnackbar("Password changed successfully!", { variant: "success" });
  };

  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">Change Password</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8">
        <InputText
          label="New Password"
          type="password"
          id="newPassword"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
        />
        <InputText
          label="Confirm New Password"
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword}
          onChange={handleChange}
        />
        <ButtonPrimary label="Change Password" type="submit" />
      </form>
    </div>
  );
};

export default ChangePassword;
