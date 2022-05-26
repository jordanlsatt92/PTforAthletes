/**
 * @author Jordan Satterfield
 * @description Renders alerts at the top right of the browser window upon an action 
 * being performed (e.g. a symptom is created or deleted, user's password is entered
 * incorrectly).
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * The Alert component renders a visible alert at the top right of the browser window. The 
 * alert message is shown with a specific background color (green for success, red for error).
 * @param alerts: an array of alerts (if there is more than one alert).
 * @returns a rendering of the alert.
 */
const Alert = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
