/**
 * @author Jordan Satterfield
 * @description Redux actions for retrieving videos or a single video from the database.
 */

import axios from "axios";
import { GET_VIDEOS, VIDEO_ERROR, GET_VIDEO } from "./types";

/**
 * @description getVideos Redux action retrieves all the videos in the database and
 * stores the information in the Redux Store.
 * @returns all videos in the database.
 */
export const getVideos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/videos");

    dispatch({
      type: GET_VIDEOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/**
 * @description getVideo Redux action retrieves a single a single video from the 
 * database by using the video ID.
 * @param id: the ID of the specific video
 * @returns a single video with the specified ID.
 */
export const getVideo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/videos/${id}`);

    dispatch({
      type: GET_VIDEO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};