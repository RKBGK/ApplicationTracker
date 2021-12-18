import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOutUser, signInUser } from '../api/auth';
import Homeconstruction from '../Images/Logo.jpg';

export default function Navigation({ user }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div
          className="navbar-brand container-fluid"
          href="#"
          style={{ width: '5', height: '5' }}
        >
          <img src={Homeconstruction} alt="construction" />
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          {/* <Link className="navbar-brand" to="/about">
            About
          </Link> */}
          <Link className="navbar-brand" to="/contactUs">
            Contact Us
          </Link>
          {/* <Link className="navbar-brand" to="/application">
            Application
          </Link> */}
          {/* <Link className="navbar-brand" to="/reportchart">
            Report
          </Link> */}
          {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="navbar-brand" to="/appcard">
              Applications
            </Link>
          ) : (
            ''
          )}
          {/* {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="navbar-brand" to="/employees">
              Employees
            </Link>
          ) : (
            ''
          )} */}
          {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="navbar-brand" to="/summary">
              Summary
            </Link>
          ) : (
            ''
          )}
          {/* {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link className="navbar-brand" to="/reports">
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
              className="nav-link active btn btn-link"
              onClick={signInUser}
              border="none"
            >
              <Icon name="setting" />
              {/* LogIn */}
            </button>
          )}
        </div>
      </nav>
    </div>
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
