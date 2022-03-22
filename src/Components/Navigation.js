import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOutUser, signInUser } from '../api/auth';
import Homeconstruction from '../Images/Logo.jpg';
import '../styles/navBar.css';

export default function Navigation({ user }) {
  return (
    <nav className="navbar flex-md-nowrap">
      <div>
        <Link className="navbar-brand" to="/">
          <img
            className="nav__logo"
            src={Homeconstruction}
            alt="construction"
          />
        </Link>
      </div>
      <div>
        <ul className="nav nav-pills nav-fill">
          {/* <Link className="nav-link" to="/about">
            About
          </Link> */}
          <Link className="nav-link" to="/contactUs">
            Contact Us
          </Link>
          <Link className="nav-link" to="/application">
            Apply Permit
          </Link>
          {/* <Link className="nav-link" to="/reportchart">
            Report
          </Link> */}
          {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="nav-link" to="/appcard">
              Applications
            </Link>
          ) : (
            ''
          )}
          {/* {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="nav-link" to="/employees">
              Employees
            </Link>
          ) : (
            ''
          )} */}
          {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="nav-link" to="/summary">
              Summary
            </Link>
          ) : (
            ''
          )}
          {/* {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="nav-link" to="/reports">
              Reports
            </Link>
          ) : (
            ''
          )} */}
          {user?.uid ? (
            <button type="button" className="nav-link" onClick={signOutUser}>
              {user.fullName} Logout
            </button>
          ) : (
            <button
              type="button"
              className="nav-link"
              onClick={signInUser}
              border="none"
            >
              <Icon name="setting" />
              {/* LogIn */}
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    uid: PropTypes.string,
    role: PropTypes.string,
  }),
};

Navigation.defaultProps = {
  user: {},
};
