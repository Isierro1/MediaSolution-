import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        navigate("/Login")
    }

  return (
    <div><button onClick={() => handleLogout()}>logout</button></div>
  )
}

export default Profile