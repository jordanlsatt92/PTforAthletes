import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideos } from "../../actions/video";
import VideoItem from "./VideoItem";
import { getSymptoms } from "../../actions/symptom";

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

  const findVideos = (vid) => {
    if (symptoms.length === 0){
        return;
    }
    for (let i = 0; i < symptoms.length; i++){
        let symp = symptoms[i];
        for (let j = 0; j < symp.effected_parts.length; j++){
            if (vid.related_parts.toString().toLowerCase().includes(symp.effected_parts[j].toString().toLowerCase())){
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
          <h1 className="large text-primary">Videos</h1>
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
