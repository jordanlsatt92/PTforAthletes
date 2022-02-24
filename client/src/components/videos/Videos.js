import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideos } from "../../actions/video";
import VideoItem from "./VideoItem";

const Videos = ({ getVideos, video: { videos, loading } }) => {
  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const [query, setQuery] = useState('');


  const onChange = (e) => {
    setQuery(e.target.value)
    //console.log(query);
  };

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

Videos.propTypes = {
  getVideos: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  video: state.video,
});

export default connect(mapStateToProps, { getVideos })(Videos);
