import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteSymptom } from "../../actions/symptom";

const SymptomItem = ({
  auth,
  deleteSymptom,
  showActions,
  symptom: { _id, user, name, effected_parts, description, updates, date },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <h4>{name}</h4>
      </div>
      <div>
        <p className="my-1">Effected Body Part(s): {effected_parts.join(", ")}</p>
        <p className="my-1">{description}</p>
        <p className="post-date">
          Created <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <Link to={`/symptoms/${_id}`} className="btn btn-primary">
              Updates{" "}
              {updates.length > 0 && (
                <span className="comment-count">{updates.length}</span>
              )}
            </Link>

            <button
              onClick={() => deleteSymptom(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

SymptomItem.propTypes = {
  symptom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteSymptom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteSymptom })(SymptomItem);
