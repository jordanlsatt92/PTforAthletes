/**
 * @author Jordan Satterfield
 * @description Renders all the symptoms of the user.
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSymptoms } from "../../actions/symptom";
import SymptomItem from "./SymptomItem";
import SymptomForm from "./SymptomForm";

/**
 * @description The Symptoms component renders all the user's symptoms. The symptoms are returned by
 * the getSymptoms Redux action. If desired by the user, the user can download a copy of their symptoms
 * and symptom updates in PDF format.
 * @param symptom: an array of the user's symptoms returned by the getSymptoms Redux action.
 * @returns an array of the user's symptoms.
 */
const Symptoms = ({ getSymptoms, symptom: { symptoms } }) => {
  useEffect(() => {
    getSymptoms();
  }, [getSymptoms]);

  /**
   * @description Generates a downloadable PDF of all the user's symptoms and symptom updates.
   * @returns a PDF file of the user's symptoms and symptom updates.
   */
  const pdfGenerate = () => {
    // Check if the user has any symptoms
    if (symptoms.length === 0){
      window.alert('You currently have no symptoms to download.')
      return null;
    }

    // Tools for PDF generation
    var pdfMake = require('pdfmake/build/pdfmake.js');
    var pdfFonts = require('pdfmake/build/vfs_fonts.js');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    // Generating the PDF document.
    var pdf = {
      content: [
        {text: `PT for Athletes\n`, style: 'header'},
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
      styles: {
        header: {
          fontSize: 20,
          bold: true
        },
        sympHeader: {
          bold: true
        }
      }
    };

    // Prompts the user to download the file.
    pdfMake.createPdf(pdf).download();
  };

  return (
    <div className="container">
      <section>
        <h1 className="large text-primary">Symptoms</h1>
        <SymptomForm />
        <div className="symptoms">
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
