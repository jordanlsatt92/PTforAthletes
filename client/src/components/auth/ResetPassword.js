import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const ResetPassword = ({ setAlert, reset_password }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    security_question: "",
  });

  const { email, password, password2, security_question } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
