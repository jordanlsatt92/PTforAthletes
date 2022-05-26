/**
 * @author Jordan Satterfield
 * @description Contains the Videos component responsible for
 * displaying all videos in the video library and a search bar
 * for narrowing the videos down by title or effected anatomy.
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideos } from "../../actions/video";
import VideoItem from "./VideoItem";

/**
 * The Videos component displays all videos returned by the
 * getVideos Redux action. A search bar is implemented to narrow 
 * videos down by name or effected anatomy.
 * @param {*} getVideos action and the video state.
 * @returns a rendering of all videos or narrowed list of videos
 * from the search using the VideoItem component.
 */
const Videos = ({ getVideos, video: { videos, loading } }) => {
  useEffect(() => {
    getVideos();
  }, [getVideos]);

  // Getter and Setter for query in the search bar.
  const [query, setQuery] = useState('');

  const onChange = (e) => {
    setQuery(e.target.value)
  };

  /**
   * Filters out videos that do not match the query in the search bar.
   * @returns the remaining videos that match the query in the search bar.
   */
  const filteredVideos = videos.filter(video => {
    return video.title.toString().toLowerCase().includes(query.toLowerCase()) ||
    video.related_parts.toString().includes(query.toLowerCase());
  });
  

  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="form">
          <h1 className="large text-primary">Videos</h1>
          <form>
          <div className="form-group">
            <input
              type="text"
              placeholder="Search for a specific video"
              name="query"
              value={query}
              onChange={(e) => onChange(e)}
            />
          </div>
          </form>
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

// Proptypes for Video component
Videos.propTypes = {
  getVideos: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
};

// Map state of Redux store to the props/params passed into the Videos function.
const mapStateToProps = (state) => ({
  video: state.video,
});

export default connect(mapStateToProps, { getVideos })(Videos);
