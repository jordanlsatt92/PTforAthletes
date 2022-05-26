/**
 * @author Jordan Satterfield
 * @description Combines all reducers for alerts, authentication,
 * symptoms, and videos.
 */
import { combineReducers } from "redux";
import alert from './alert';
import auth from './auth';
import symptom from './symptom';
import video from './video';

export default combineReducers({
    alert,
    auth,
    symptom,
    video
});