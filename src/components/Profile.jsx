import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const Profile = () => {
  const navigate = useNavigate();

  function handleLogout() {
    supabase.auth.signOut();
    navigate("/Login");
  }

  return (
    <div>
      <button onClick={() => handleLogout()}>logout</button>
    </div>
  );
};

export default Profile;
