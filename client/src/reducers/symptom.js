import {
  GET_SYMPTOMS,
  SYMPTOM_ERROR,
  DELETE_SYMPTOM,
  ADD_SYMPTOM,
  GET_SYMPTOM,
  ADD_UPDATE,
  REMOVE_UPDATE
} from "../actions/types";

const initialState = {
  symptoms: [],
  symptom: null,
  loading: true,
  error: {},
};

function symptomReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SYMPTOMS:
      return {
        ...state,
        symptoms: payload,
        loading: false,
      };
    case GET_SYMPTOM:
      return {
        ...state,
        symptom: payload,
        loading: false,
      };
    case ADD_SYMPTOM:
      return {
        ...state,
        symptoms: [...state.symptoms, payload],
        loading: false,
      };
    case DELETE_SYMPTOM:
      return {
        ...state,
        symptoms: state.symptoms.filter((symptom) => symptom._id !== payload),
        loading: false,
      };
    case SYMPTOM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_UPDATE:
      return {
        ...state,
        symptom: { ...state.symptom, updates: payload},
        loading: false
      };
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
