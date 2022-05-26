/**
 * @author Jordan Satterfield
 * @description Renders the reset password form and calls the reset_password Redux action.
 * The password is then updated in the Users collection in the database.
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

/**
 * The Reset Password component displays the form that allows users to reset their passwords.
 * Upon successful entering of the answer to the security question the user entered when creating
 * the account, the reset_password Redux action is called and the user's password is updated in the 
 * database.
 * @param setAlert: the Redux action that is called to display a successful password reset or
 * invalid credentials alert.
 * @returns the reset password form.
 */
const ResetPassword = ({ setAlert, reset_password }) => {
  // Set the initial state of the form data.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    security_question: "",
  });

  // Destructuring of the form data.
  const { email, password, password2, security_question } = formData;

  //Update the form data as the user enters characters.
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Dispatching the reset_password Redux action
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      reset_password({ email, password, security_question });
      setFormData({
        email: "",
        password: "",
        password2: "",
        security_question: "",
      });
    }
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Reset Password</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
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
          <small className="form-text">
            Enter your answer to the following security question to reset your
            password:
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
        <input
          type="submit"
          className="btn btn-primary"
          value="Reset Password"
        />
      </form>
      <p className="my-1">
        Return to <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  reset_password: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(null, { setAlert, reset_password })(ResetPassword);
