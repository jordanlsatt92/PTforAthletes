/**
 * @author Jordan Satterfield
 * @description renders the form associated with logging on to the site.
 */
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

/**
 * @description The Login compenent renders the form associated with logging on to the site.
 * The login Redux action is used to log the user on. Upon successful login, the user is
 * redirected to the symptoms page.
 * @param login: Redux action that authenticates the user.
 * @param isAuthenticated: boolean that if true redirects the user to the symptoms page.
 * @returns the login form.
 */
const Login = ({ login, isAuthenticated }) => {
  // Initialize the form data.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure the form data.
  const { email, password } = formData;

  // Update the form data as the user enters characters.
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Upon submission, dispatch the login Redux action.
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if user is logged in
  if (isAuthenticated) {
    return <Navigate to="/symptoms" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      <p className="my-1">
        Forgot password? <Link to="/password_reset">Reset Password</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
