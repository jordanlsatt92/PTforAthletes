/**
 * @author Jordan Satterfield
 * @description This file contains all of the redux actions associated with account registration, login,
 * logout, password reset, and user authentication.
 */
import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_PASSWORD,
  RESET_FAIL,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

/**
 * @description loadUser Redux action sets the JSON web token in the local storage of the browser.
 * @returns the token that allows the user to navigate private routes on the site.
 */
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

/**
 * @description register Redux action creates a new user in the database.
 * @param name: the entered user's name
 * @param email: the entered email.
 * @param password: the entered password.
 * @param security_question: the entered security question answer.
 */
export const register =
  ({ name, email, password, security_question }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password, security_question });

    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

/**
 * @description login Redux action that logs in the user upon entering their email and password.
 * @param email: the user's email.
 * @param password: the user's password. 
 */  
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await axios.post("/api/auth", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

/**
 * @description logout Redux action the logs the user out of their account.
 */
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

/**
 * @description reset_password Redux action that updates the user's password in the database
 * with the newly entered password
 * @param email: user's email.
 * @param security_question: the answer to the security question the user entered upon registering their account.
 * @param password: the user's new password. 
 */
export const reset_password =
  ({ email, security_question, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password, security_question });

    try {
      await axios.put("/api/users", body, config);
      dispatch({
        type: RESET_PASSWORD,
      });

      dispatch(setAlert("Your password has been updated", "success"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: RESET_FAIL,
      });
    }
  };
