import axios from "axios";
import { GET_VIDEOS, VIDEO_ERROR, GET_VIDEO } from "./types";

//Get videos

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