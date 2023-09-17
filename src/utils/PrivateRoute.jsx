import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = window.localStorage.getItem("userInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token, navigate]);

  return children;
};

export default PrivateRoute;