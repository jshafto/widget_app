import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({setUser}) => {
  const onLogout = async (e) => {
    await logout();
    setUser(null);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
