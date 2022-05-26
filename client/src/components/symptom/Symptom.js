/**
 * @author Jordan Satterfield
 * @description renders a single symptom according to the layout below.
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SymptomItem from "../symptoms/SymptomItem";
import { Link, useParams } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import { getSymptom } from "../../actions/symptom";
import UpdateItem from './UpdateItem';

/**
 * @description The Symptom component renders a single symptom. This rendering includes all the updates
 * for the specified symptom
 * @param getSymptom: the Redux action that returns a single symptom.
 * @param symptom: the symptom containing all the updates to be rendered.
 * @returns a rendering of the symptom and all updates for that symptom.
 */
const Symptom = ({ getSymptom, symptom: { symptom, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getSymptom(id);
  }, [getSymptom, id]);

  return loading || symptom === null ? (
    <p>Loading...</p>
  ) : (
    <section className="container">
      <Link to="/symptoms" className="btn">
        All Symptoms
      </Link>
      <SymptomItem symptom={symptom} showActions={false} />
      <UpdateForm symptomId={symptom._id} />
      <div className="comments">
        {symptom.updates.map((update) => (
          <UpdateItem key={update._id} update={update} symptomId={symptom._id} />
        ))}
      </div>
    </section>
  );
};

Symptom.propTypes = {
  getSymptom: PropTypes.func.isRequired,
  symptom: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  symptom: state.symptom,
});

export default connect(mapStateToProps, { getSymptom })(Symptom);
