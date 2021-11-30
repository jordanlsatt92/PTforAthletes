import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSymptom } from "../../actions/symptom";

const SymptomForm = ({ addSymptom }) => {
  const [formData, setFormData] = useState({
    name: "",
    effected_parts: "",
    description: "",
  });

  const { name, effected_parts, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Add a new symptom</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addSymptom({ name, effected_parts, description });
          setFormData({
            name: "",
            effected_parts: "",
            description: "",
          });
        }}
      >
        <textarea
          name="name"
          cols="30"
          rows="1"
          placeholder="Name of symptom"
          value={name}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <textarea
          name="effected_parts"
          cols="30"
          rows="1"
          placeholder="Effected body parts"
          value={effected_parts}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <small className="form-text">
          Please input the body parts that are effected separated by commas.
          e.g. calf, shin, foot
        </small>
        <textarea
          name="description"
          cols="30"
          rows="3"
          placeholder="Symptom description"
          value={description}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

SymptomForm.propTypes = {
  addSymptom: PropTypes.func.isRequired,
};

export default connect(null, { addSymptom })(SymptomForm);
