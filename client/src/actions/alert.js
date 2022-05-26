/**
 * @author Jordan Satterfield
 * @description This file contains the Redux actions associated with setting alerts for the user.
 */
import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

/**
 * @description setAlert Redux action creates an alert in the Redux store that will be displayed for the user.
 * @param msg: the message to be displayed in the alert.
 * @param alertType: the type of alert to be displayed (determines background color for the alert).
 * @param timeout: the amount of time before the alert disappears.
 */
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), timeout);
};
