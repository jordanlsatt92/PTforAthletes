/**
 * @author Jordan Satterfield
 * @description This file contains all Redux actions for retrieving and deleting 
 * symptoms and symptom updates.
 */
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


/**
 * @description: getSymptoms Redux action returns all of the user's symptoms in the database.
 * @returns all of the user's symptoms.
 */
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

/**
 * @description deleteSymptom Redux action deletes the specified symptom by the symptom ID.
 * @param id: the ID of the symptom to be deleted. 
 */
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

/**
 * @description addSymptom Redux action creates a new symptom in the database using
 * the form data entered by the user.
 * @param formData: the data entered by the user regarding the new symptom (name, effected anatomy, and description).
 */
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

/**
 * @description getSymptom Redux action that retrieves a single symptom by the symptom ID.
 * @param id: the ID of the symptom to be retrieved. 
 * @returns a single symptom from the database.
 */
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

/**
 * @description addUpdate Redux action adds the update form data entered by the user to the
 * symptom in the database.
 * @param symptomId: ID of the symptom that is being updated. 
 * @param formData: the form data entered by the user regarding the update (update description). 
 */
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

/**
 * @description deleteUpdate Redux action deletes the specified symptom update from the symptom 
 * in the database.
 * @param symptomId: ID of the symptom from which the update will be deleted.
 * @param updateId: the ID of the update to be deleted. 
 */
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