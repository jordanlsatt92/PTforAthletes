/**
 * @author Jordan Satterfield
 * @description renders the form needed for account registration.
 */
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

/**
 * @description The Register component renders a form for account registration. This includes a
 * name field, email field, password and password duplicate fields, and a field where the user
 * can enter an answer to the security question.
 * @param setAlert: the setAlert Redux action that displays alerts.
 * @param register: the Redux action that creates the user in the database.
 * @param isAuthenticated: boolean that if true allows the user to see the protected paths of the site.
 * @returns The form associated with registering a new account.
 */
const Register = ({ setAlert, register, isAuthenticated }) => {
  // Initilize the form data.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    security_question: "",
  });

  // Destructure the form data.
  const { name, email, password, password2, security_question } = formData;

  // Update the form data as the user enters new characters.
  const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* Upon submission, create a new account if the email does not already exist in the 
  database. Dispatch the setAlert Redux action if the passwords do not match. */
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password, security_question });
    }
  };

  // Redirect if user is logged in
  if (isAuthenticated) {
    return <Navigate to="/symptoms" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="8"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="8"
          />
        </div>
        <div className="form-group">
          <small className="form-text">
            To allow users to update their password, please answer the following
            security question:
          </small>
          <small>What kind of security question is this?</small>
          <input
            type="text"
            placeholder="Security Question Answer"
            name="security_question"
            value={security_question}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <small className="form-text">
          By registering for an account, you are agreeing to the site's <Link to="/terms&conditions">Terms & Conditions</Link>
        </small>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
