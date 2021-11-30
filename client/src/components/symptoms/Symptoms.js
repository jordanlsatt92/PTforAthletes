import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSymptoms } from "../../actions/symptom";
import SymptomItem from './SymptomItem';
import SymptomForm from "./SymptomForm";

const Symptoms = ({ getSymptoms, symptom: { symptoms } }) => {
  useEffect(() => {
    getSymptoms();
  }, [getSymptoms]);
  return (
    <div className='container'>
      <section >
        <h1 className="large text-primary">Symptoms</h1>
        <SymptomForm />
        <div className="posts">
          {symptoms.map((symptom) => (
            <SymptomItem key={symptom._id} symptom={symptom} showActions={true}/>
          ))}
        </div>
      </section>
    </div>
  );
};

Symptoms.propTypes = {
  getSymptoms: PropTypes.func.isRequired,
  symptom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  symptom: state.symptom,
});

export default connect(mapStateToProps, { getSymptoms })(Symptoms);
