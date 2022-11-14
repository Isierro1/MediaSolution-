import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../supabase";

const validate = (input) => {
  let errors = {};
   if (input.email === "") {
    errors.email = "*Campo requerido";
  } else if (input.password === "") {
    errors.password = "*Campo requerido";
  } else if (input.repeat_Password === "") {
    errors.repeat_Password = "*Campo requerido";
  } else if (
    !input.email.match(
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
    )
  ) {
    errors.email = "*Formato de email incorrecto.";
  } else if (input.password !== input.repeat_Password) {
    errors.repeat_Password = "*Las contraseñas deben coincidir.";
  } else if (!input.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    errors.password = "*8 caracteres, al menos 1 letra y un numero";
  }
  return errors;
};

const Register = () => {
  let url = "https://www.timesolution.com.ar/";

  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    repeat_Password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (
      !Object.getOwnPropertyNames(errors).length &&
      input.email &&
      input.password &&
      input.repeat_Password
    ) {
      const { user, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });
      setInput({
        email: '',
        password: '',
        repeat_Password:""
    });
      error ? alert(error) : console.log(user);
      navigate('/Login');
  } else {
    alert("Datos Incorrectos")
  }
};

  return (
    <div className="background">
      <Helmet>
        {" "}
        <title>MediaSolution +</title>
      </Helmet>
      <div className="register-title">MS+</div>
      <div className="register-to-ms">Registrate a MS+</div>
      <div className="text-to-define">Texto a Definir.</div>
      <div className="register-div">
        <form className="register-form" onSubmit={(e) => signUp(e)}>
          <div>
            <input
              className="register-inputs"
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={(e) => handleChange(e)}
              required
              maxLength={40}
            ></input>
            {errors.email && <div className="error-email">{errors.email}</div>}
          </div>
          <div>
            <input
              className="register-inputs"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={input.password}
              onChange={(e) => handleChange(e)}
              required
              maxLength={40}
            ></input>
            {errors.password && (
              <div className="error-password">{errors.password}</div>
            )}
          </div>
          <div>
            <input
              className="register-inputs"
              type="password"
              placeholder="Repetir Contraseña"
              name="repeat_Password"
              value={input.repeat_Password}
              onChange={(e) => handleChange(e)}
              required
              maxLength={40}
            ></input>
            {errors.repeat_Password && (
              <div className="error-repeat-password">
                {errors.repeat_Password}
              </div>
            )}
          </div>
          <div className="register-checkbox">
            <input type="checkbox" required />
          </div>
          <div className="register-terms">
            Estoy de acuerdo con los <Link to="#">terminos y politicas</Link>
          </div>
          <div className="register-button-div">
            <button className="register-button">Registrarme</button>
          </div>
          <div className="register-logIn">
            ¿Tienes una cuenta? <Link to="/Login">Inicia sesión</Link>
          </div>
          <div className="register-copyright">
            <a href={url}>Time Solution Software.</a> All Rights Reserved © 2022
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
