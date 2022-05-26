/**
 * @author Jordan Satterfield
 * @description renders the playable video using the ReactPlayer component from the
 * ReactPlayer library.
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideo } from "../../actions/video";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

/**
 * @description The Video component renders the playable video.
 * @param video: the video selected by the user in the Videos or SuggestedVideos views; returned by 
 * the Redux getVideo action.
 * @returns a playable video component the user can watch.
 */
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
      <Link to="/suggested_videos" className="btn">
        Suggested Videos
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
