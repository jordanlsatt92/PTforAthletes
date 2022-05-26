/**
 * @author Jordan Satterfield
 * @description Renders the update form which includes a single text field of "Description."
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUpdate } from '../../actions/symptom';

/**
 * @description The UpdateForm component renders the form for creating an update for a specific symptom.
 * @param symptomId: the ID of the symptom to be updated.
 * @param addUpdate: the Redux action that creates the update and adds the update to the database. 
 * @returns a rendering of the symptom form.
 */
const UpdateForm = ({ symptomId, addUpdate }) => {
  const [text, setText] = useState('');

  return (
    <div className='symptom-form'>
      <div className='bg-primary p'>
        <h3>Update Symptom</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addUpdate(symptomId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Symptom update description'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

UpdateForm.propTypes = {
  addUpdate: PropTypes.func.isRequired
};

export default connect(
  null,
  { addUpdate }
)(UpdateForm);