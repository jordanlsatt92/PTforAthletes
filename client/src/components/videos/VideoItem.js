import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

const VideoItem = ({ video: { _id, title, description, url } }) => {
  return (
    <Link to={`/videos/${_id}`} className="video-child">
      <ReactPlayer
        url={url}
        playIcon={
          <div className="video-background">
            <h3 className="video-text">{title}</h3>
          </div>
        }
        light={true}
        controls={false}
        width="640"
        height="360"
      />
    </Link>
  );
};

VideoItem.propTypes = {
  video: PropTypes.object.isRequired,
//  auth: PropTypes.object.isRequired,
};

// const mapStateToProps = state => {
//     auth: state.auth
// }

export default connect(null, {})(VideoItem);
