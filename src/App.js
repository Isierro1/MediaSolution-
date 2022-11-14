import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import supabase from "./supabase";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((session) => {
      session ? navigate("/Perfil") : navigate("/Login");
    });
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Perfil" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
