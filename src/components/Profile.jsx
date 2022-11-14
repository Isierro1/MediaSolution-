import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const Profile = () => {
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    window.location.reload()
    console.log(error)
  }

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      if(response.data.user === null) {
        navigate("/Login")
      }
    })
  }, [navigate]);

  return (
    <div>
      <button onClick={() => signOut()}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile;
