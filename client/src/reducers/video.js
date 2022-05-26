/**
 * @author Jordan Satterfield
 * @description Contains the video reducer for Redux. Sets the inital
 * state. Updates the state with all videos or single video for viewing.
 */

//Redux actions for videos
import { GET_VIDEOS, VIDEO_ERROR, GET_VIDEO } from "../actions/types";

const initialState = {
  videos: [],
  video: null,
  loading: true,
  error: {},
};

function videoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //Updates the state with all returned videos
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    //Updates the state with the specified video
    case GET_VIDEO:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    //Updates the state with an error if an error occurs.
    case VIDEO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default videoReducer;
