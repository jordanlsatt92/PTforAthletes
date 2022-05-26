/**
 * @author Jordan Satterfield
 * @description Renders the landing page when the site is visited.
 */
import React from "react";
import { Link } from 'react-router-dom';

/**
 * @description Renders the landing page of the site. Contains the background and
 * login and register buttons.
 */
export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">PT for Athletes</h1>
          <p className="lead">
            Welcome to Physical Therapy for Athletes
            <br/>Your virtual physical therapist
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
