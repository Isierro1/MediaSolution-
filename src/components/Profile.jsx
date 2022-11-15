import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import SideBar from "./SideBar";
import "../styles/profile.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Profile = () => {
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
    console.log(error);
  }

// let username = supabase.auth.getUser().then((response) => {
// let user = response.data.user.user_metadata
// console.log(Object.values(user)[0])
//  return Object.values(user)[0]
//  })

// console.log(username)

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      if (response.data.user === null) {
        navigate("/Login");
      }
    });
  }, [navigate]);

  return (
    <div className="background">
    <div className="search-bar"><input className="search-input" placeholder="Buscar..."></input></div>
    <div className="user-name">Bienvenido a MediaSolution+</div>
      <div className="notifications">
        <i className="bi bi-envelope-fill message-icon"></i>
        <i className="bi bi-bell-fill bell-icon"></i>
      </div>
      <div className="logout">
        <i
          className="bi bi-box-arrow-right icon-door"
          onClick={() => signOut()}
        ></i>
        <button className="logout-btn" onClick={() => signOut()}>
          Cerrar sesión
        </button>
      </div>
      <SideBar />
    </div>
  );
};

export default Profile;
