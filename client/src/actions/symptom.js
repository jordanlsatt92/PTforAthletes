import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_SYMPTOM,
    ADD_SYMPTOM,
    DELETE_SYMPTOM,
    GET_SYMPTOMS,
    SYMPTOM_ERROR,
    ADD_UPDATE,
    REMOVE_UPDATE
} from './types';


// Get Symptoms
export const getSymptoms = () => async dispatch => {
    try {
        const res = await axios.get(`/api/symptoms/me`);

        dispatch({
            type: GET_SYMPTOMS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SYMPTOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete Symptom
export const deleteSymptom = id => async dispatch => {
    try {
        await axios.delete(`/api/symptoms/${id}`);

        dispatch({
            type: DELETE_SYMPTOM,
            payload: id
        });

        dispatch(setAlert('Symptom Removed','success'));
    } catch (err) {
        dispatch({
            type: SYMPTOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Add Symptom
export const addSymptom = (formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/symptoms`, formData);

        dispatch({
            type: ADD_SYMPTOM,
            payload: res.data
        });

        dispatch(setAlert('Symptom created','success'));
    } catch (err) {
        dispatch({
            type: SYMPTOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Get Symptoms
export const getSymptom = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/symptoms/${id}`);

        dispatch({
            type: GET_SYMPTOM,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SYMPTOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Add update
export const addUpdate = (symptomId, formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/symptoms/update/${symptomId}`, formData);

        dispatch({
            type: ADD_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Update added','success'));
    } catch (err) {
        dispatch({
            type: SYMPTOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete update
export const deleteUpdate = (symptomId, updateId) => async dispatch => {
    try {
        await axios.delete(`/api/symptoms/update/${symptomId}/${updateId}`);

        dispatch({
            type: REMOVE_UPDATE,
            payload: updateId
        });

        dispatch(setAlert('Update removed','success'));
    } catch (err) {
        dispatch({
            type: SYMPTOM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}