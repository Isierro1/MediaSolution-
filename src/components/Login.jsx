import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../supabase";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    
let url = "https://www.timesolution.com.ar/";

  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
   };

   const signIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: input.username,
      password: input.password,
    });
    setInput({
      username: '',
      password: '',
  });
    error ? toast.error("Credenciales incorrectas") : navigate('/Perfil');
    };

    useEffect(() => {
      supabase.auth.getUser().then((response) => {
        if(!response.data.user === null) {
          navigate("/Perfil")
        }
      })
    }, [navigate])

  return (
    <div className="background">
      <Helmet>
        {" "}
        <title>MediaSolution +</title>
      </Helmet>
      <div className="register-title">MS+</div>
      <div className="register-to-ms">Bienvenido a MS+</div>
      <div className="text-to-define">Texto a Definir.</div>
      <div className="register-div">
        <form className="register-form" onSubmit={(e) => signIn(e)}>
          <div>
            <input
              className="register-inputs"
              type="text"
              placeholder="Email"
              name="username"
              required
              maxLength={100}
              value={input.username}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div>
            <input
              className="register-inputs"
              type="password"
              placeholder="Contraseña"
              name="password"
              required
              maxLength={40}
              value={input.password}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="login-button-div">
            <button className="register-button">Iniciar sesión</button>
            <ToastContainer/>
          </div>
          <div className="login-logIn">
            ¿Olvidaste tu contraseña? <Link to="/">Recuperála</Link>
          </div>
          <div className="login-register">
            ¿No tenés una cuenta? <Link to="/">Registráte</Link>
          </div>
          <div className="login-copyright">
            <a href={url}>Time Solution Software.</a> All Rights Reserved © 2022
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
