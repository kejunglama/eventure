import { useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    window.location.href = `${
      import.meta.env.VITE_REGISTRATION_URL
    }&redirect_uri=${window.location.origin}/login?registration=success`;
  }, []);

  return null;
};

export default Signup;
