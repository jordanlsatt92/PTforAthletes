/**
 * @author Jordan Satterfield
 * @description The navigation bar resides at the top of the browser window and displays
 * links to other parts of the application.
 */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

/**
 * @description The Navbar component renders a bar at the top containing links to other parts of the
 * site. If they user is not logged in, the guest links (Register, Login, About) are shown. If the user
 * is logged in, the authenticated links (Symptoms, Videos, Suggested Videos, Logout function) are shown.
 * @param auth: boolean; a part of the state of the application.
 * @returns the links for guests or authenticated users.
 */
export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // Links for authenticated users.
  const authLinks = (
    <ul>
      <li>
        <Link to="/symptoms">Symptoms</Link>
      </li>
      <li>
        <Link to="/videos">Video Library</Link>
      </li>
      <li>
        <Link to="/suggested_videos">Suggested Videos</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  // Links for websites guests (people not logged in).
  const guestLinks = (
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-swimmer fa-flip-horizontal"></i>{" "}
          <i className="fas fa-biking"></i> <i className="fas fa-running"></i>{" "}
          PT for Athletes
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
