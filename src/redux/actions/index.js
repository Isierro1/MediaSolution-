import axios from "axios";
import AuthService from "../../services/auth.service";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_MESSAGE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

const API_URL = "http://localhost:8080/api/auth/";

export const register = (payload) => {
  return async function (dispatch) {
    return axios
      .post(API_URL + "signup", payload)
      .then((user) => dispatch({ type: "REGISTER", payload: user.data }))
      .catch((err) => alert(err.response.data.message));
  };
};

export const login = (payload) => (dispatch) => {
  return AuthService.login(payload)
    .then((user) => dispatch({ type: "LOGIN", payload: user.data }))
    .catch((err) => alert(err.response.data.message));
};

export const register2 = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login1 = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
