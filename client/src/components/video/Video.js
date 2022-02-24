import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideo } from "../../actions/video";
import { Link, useParams } from "react-router-dom";
import VideoItem from "../videos/VideoItem";
import ReactPlayer from "react-player";

const Video = ({ getVideo, video: {video, loading} }) => {
  const { id } = useParams();
  useEffect(() => {
    getVideo(id);
  }, [getVideo, id]);

  

  return loading || video === null ? (<p>Loading...</p>) : (
    <div className="container">
      <Link to="/videos" className="btn">
        All Videos
      </Link>
      <ReactPlayer className="player-wrapper" url={video.url} controls={true} width='auto' height='550px' />
      <div className="video-title">{video.title}</div>
      <p>{video.description}</p>
      
    </div>
  );
};

Video.propTypes = {
  getVideo: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  video: state.video,
});

export default connect(mapStateToProps, { getVideo })(Video);
