/**
 * @author Jordan Satterfield
 * @description Contains the symptom reducer for Redux. Sets the initial
 * state and updates the state as actions are dispatched.
 */

// Redux actions for symptoms
import {
  GET_SYMPTOMS,
  SYMPTOM_ERROR,
  DELETE_SYMPTOM,
  ADD_SYMPTOM,
  GET_SYMPTOM,
  ADD_UPDATE,
  REMOVE_UPDATE
} from "../actions/types";

//Initial state
const initialState = {
  symptoms: [],
  symptom: null,
  loading: true,
  error: {},
};

//Symptom Reducer
function symptomReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //Updates the state with all the user's symptoms.
    case GET_SYMPTOMS:
      return {
        ...state,
        symptoms: payload,
        loading: false,
      };
    //Updates the state with a specific user symptom.
    case GET_SYMPTOM:
      return {
        ...state,
        symptom: payload,
        loading: false,
      };
    //Updates the state with the new added symptom.
    case ADD_SYMPTOM:
      return {
        ...state,
        symptoms: [...state.symptoms, payload],
        loading: false,
      };
    //Updates the state of the deletion of a specific symptom.
    case DELETE_SYMPTOM:
      return {
        ...state,
        symptoms: state.symptoms.filter((symptom) => symptom._id !== payload),
        loading: false,
      };
    //Updates the state with an error if symptoms cannot be retrieved.
    case SYMPTOM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    //Updates the state with the added update.
    case ADD_UPDATE:
      return {
        ...state,
        symptom: { ...state.symptom, updates: payload},
        loading: false
      };
    //Updates the state after the deletion of a symptom update.
    case REMOVE_UPDATE:
      return {
        ...state,
        symptom: {
          ...state.symptom,
          updates: state.symptom.updates.filter(update => update._id !== payload),
        },
        loading: false
      }
    default:
      return state;
  }
}

export default symptomReducer;
