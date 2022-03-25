import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSymptoms } from "../../actions/symptom";
import SymptomItem from "./SymptomItem";
import SymptomForm from "./SymptomForm";

const Symptoms = ({ getSymptoms, symptom: { symptoms } }) => {
  useEffect(() => {
    getSymptoms();
  }, [getSymptoms]);

  const pdfGenerate = () => {
    if (symptoms.length === 0){
      window.alert('You currently have no symptoms to download.')
      return null;
    }
    var pdfMake = require('pdfmake/build/pdfmake.js');
    var pdfFonts = require('pdfmake/build/vfs_fonts.js');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    var pdf = {
      content: [
        symptoms.map(symptom => (
          symptom.updates.length === 0 ? 
          `Symptom Name: ${symptom.name.toString()}
          First Recorded: ${symptom.date.substring(5,7)}-${symptom.date.substring(8,10)}-${symptom.date.substring(0,4)}
          Effected Anatomy: ${symptom.effected_parts.join(', ')}
          Description: ${symptom.description}
          \n`
          :
          symptom.updates.map(update => (
            update._id === symptom.updates[0]._id ?
            `Symptom Name: ${symptom.name.toString()}
            First Recorded: ${symptom.date.substring(5,7)}-${symptom.date.substring(8,10)}-${symptom.date.substring(0,4)}
            Effected Anatomy: ${symptom.effected_parts.join(', ')}
            Description: ${symptom.description}\n
            Update: ${update.date.substring(5,7)}-${update.date.substring(8,10)}-${update.date.substring(0,4)}
            Description: ${update.text}
            \n` 
            : 
            `Update: ${update.date.substring(5,7)}-${update.date.substring(8,10)}-${update.date.substring(0,4)}
            Description: ${update.text}
            \n`
          ))
        )) 
      ],
    };

    pdfMake.createPdf(pdf).download();
  };

  return (
    <div className="container">
      <section>
        <h1 className="large text-primary">Symptoms</h1>
        <SymptomForm />
        <div className="posts">
          {symptoms.map((symptom) => (
            <SymptomItem
              key={symptom._id}
              symptom={symptom}
              showActions={true}
            />
          ))}
        </div>
      </section>
      <div>Want to download a copy of your symptoms? Click below!</div>
      <button onClick={pdfGenerate} className="btn btn-dark my-1" >Download Symptoms</button>
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
