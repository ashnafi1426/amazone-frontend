import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Dataprovider/Dataprovider";

const ProtectedRout = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const { state } = useContext(DataContext); // ✅ Get state from context
  const { user } = state; // ✅ Extract user from state

  useEffect(() => {
    if (!user) {
      // redirect to login with message and target page
      navigate("/auths", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  // render children only if user exists
  return user ? children : null;
};

export default ProtectedRout;
