/**
 * @author Jordan Satterfield
 * @description The SuggestedVideos component renders the thumbnails of
 * the videos related to the user's symptoms. This is done by the findVideos
 * function explained in more detail below. Upon clicking one of the video 
 * thumbnails, the user is redirected to a view displaying the playable single
 * video.
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideos } from "../../actions/video";
import VideoItem from "./VideoItem";
import { getSymptoms } from "../../actions/symptom";

/**
 * @description Renders the videos related to the user's symptoms.
 * @params video: an array of all the videos in the database returned by the getVideos Redux action.
 * symptom: an array of all the user's symptoms in the database returned by the getSymptoms Redux action.
 * @returns all videos that target a specific muscle or group of muscles found in the user's symptoms.
 */
const SuggestedVideos = ({
  getVideos,
  getSymptoms,
  video: { videos, loading },
  symptom: { symptoms },
}) => {
  useEffect(() => {
    getVideos();
    getSymptoms();
  }, [getVideos, getSymptoms]);

  /**
   * @description Helper function that for each video checks to see if a symptom's effected_parts (anatomy)
   * is in the video's related_parts (related anatomy). Returns an array of videos that target the symptom's
   * anatomy.
   * @param vid: a video returned by the getVideos Redux action. 
   * @returns an array of videos that contain the same anatomy or some of the anatomy listed in the symptom.
   */
  const findVideos = (vid) => {
    if (symptoms.length === 0){
        return;
    }
    for (let i = 0; i < symptoms.length; i++){
        let symp = symptoms[i];
        for (let j = 0; j < symp.effected_parts.length; j++){
            if (vid.related_parts.toString().toLowerCase().includes(symp.effected_parts[j].toString().toLowerCase())){
              //console.log(symp.effected_parts[j].toString().toLowerCase());
              return true;
            } 
        }
    }
    return false;
  };

  const filteredVideos = videos.filter((video) => {
      return findVideos(video);
  }); 

  return (
    <div className="container">
      {symptoms.length === 0 ? (
        <h1>You currently have zero recorded symptoms. Add symptoms to get suggested videos</h1>
      ) : (
        <div className="form">
          <h1 className="large text-primary">Suggested Videos</h1>
          <div className="video-wrapper">
            {filteredVideos.map((video) => (
              <VideoItem key={video._id} video={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

SuggestedVideos.propTypes = {
  getVideos: PropTypes.func.isRequired,
  getSymptoms: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
  symptom: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  video: state.video,
  symptom: state.symptom,
});

export default connect(mapStateToProps, { getVideos, getSymptoms })(
  SuggestedVideos
);
