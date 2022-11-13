import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route exact path="/Registro" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Perfil" element={<Profile />} />
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
