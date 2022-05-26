/**
 * @author Jordan Satterfield
 * @description Renders a single update for the specified symptom.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUpdate } from "../../actions/symptom";
import Moment from "react-moment";

/**
 * The UpdateItem component renders the layout for a single symptom update
 * @param symptomId: the ID of the specified symptom.
 * @param update: the update to be rendered that includes the update text and date the update was created. 
 * @returns a rendering of the single update.
 */
const UpdateItem = ({
  symptomId,
  update: { _id, text, date },
  auth,
  deleteUpdate,
}) => (
  <div className="symptom bg-white p-1 my-1">
    <div>
    <p className="symptom-date p-1">
        Updated on <Moment format="MM/DD/YYYY">{date}</Moment>
      </p>
      <button
        onClick={() => deleteUpdate(symptomId, _id)}
        type="button"
        className="btn btn-danger" 
      >
        <i className="fas fa-times" />
      </button>
    </div>
    <div>
      <p className="p-1">{text}</p>
    </div>
  </div>
);

UpdateItem.propTypes = {
  symptomId: PropTypes.string.isRequired,
  update: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteUpdate })(UpdateItem);
