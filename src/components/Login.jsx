import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/index";

// const validate = (input) => {
//     let errors = {};
//     if (input.username === "") {
//       errors.username = "*Campo requerido";
//     } else if (input.email === "") {
//       errors.email = "*Campo requerido";
//     } else if (input.password === "") {
//       errors.password = "*Campo requerido";
//     } else if (input.repeat_Password === "") {
//       errors.repeat_Password = "*Campo requerido";
//     } else if (
//       !input.email.match(
//         /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
//       )
//     ) {
//       errors.email = "*Formato de email incorrecto.";
//     } else if (input.password !== input.repeat_Password) {
//       errors.repeat_Password = "*Las contraseñas deben coincidir.";
//     } else if (!input.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
//       errors.password = "*8 caracteres, al menos 1 letra y un numero";
//     }
//     return errors;
//   };

const Login = () => {
    
let url = "https://www.timesolution.com.ar/";

const dispatch = useDispatch();
  // const usernames = useSelector((state) => state.usernames);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

//     setErrors(
//       validate({
//         ...input,
//         [e.target.name]: e.target.value,
//       })
//     );
   };

  function handleSubmit(e) {
      e.preventDefault(); 
      dispatch(login(input))
      setInput({
        username: "",
        password: "",
      });
      navigate("/Perfil");
  }

  return (
    <div>
      <Helmet>
        {" "}
        <title>MediaSolution +</title>
      </Helmet>
      <div className="register-title">MS+</div>
      <div className="register-to-ms">Bienvenido a MS+</div>
      <div className="text-to-define">Texto a Definir.</div>
      <div className="register-div">
        <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="register-inputs"
              type="text"
              placeholder="Usuario"
              name="username"
              required
              maxLength={20}
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
          </div>
          <div className="login-logIn">
            ¿Olvidaste tu contraseña? <Link to="/Registro">Recuperála</Link>
          </div>
          <div className="login-register">
            ¿No tenés una cuenta? <Link to="/Registro">Registráte</Link>
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
