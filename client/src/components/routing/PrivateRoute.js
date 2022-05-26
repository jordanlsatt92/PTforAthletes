/**
 * @author Jordan Satterfield
 * @description verifies that the user is logged in.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * @description verifies the user is authenticated. If the user is authenticated, the user may navigate
 * the site; otherwise they are redirected to the login page.
 * @param component: the component or view the user is attempting to visit.
 * @param auth: the auth property in the state indicating whether the user is authenticated using the 
 * isAuthenticated Redux action.
 */
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
}) => {
  {/** If the user is authenticated, redirect them to the specified component. */}
  if (isAuthenticated) return <Component />;
  {/** If the user is NOT authenticated, redirect them to the login page. */}
  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
