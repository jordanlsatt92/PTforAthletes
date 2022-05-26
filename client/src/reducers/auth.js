/**
 * @author Jordan Satterfield
 * @description Contains the reducer for user Authentication. 
 * Sets and updates the state based upon the dispatched actions.
 */

// Redux actions for authentication
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD,
  RESET_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  symptoms: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Updates the state with the user and sets authentication to true.
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    /* Updates the state with the JSON web token upon successful
       registration or login */
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    // Updates the state by removing any data about the user and sets authenticated to false.
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case RESET_PASSWORD:
    case RESET_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        symptoms: null,
      };
    default:
      return state;
  }
}

export default authReducer;
