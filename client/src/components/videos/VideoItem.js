/**
 * @author Jordan Satterfield
 * @description The VideoItem component renders the thumbnail for
 * the video and the title of the video.
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
/**
 * The VideoItem renders the video thumbnail and title using
 * the imported ReactPlayer component. Upon clicking the VideoItem,
 * the user is redirected the Video display where the video can be watched.
 * @param {*} Video: the video url, title, ID, and description
 * @returns a rendering of the VideoItem displaying the thumbnail and title.
 */
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

//Prop type for the VideoItem
VideoItem.propTypes = {
  video: PropTypes.object.isRequired,
};

export default connect(null, {})(VideoItem);
