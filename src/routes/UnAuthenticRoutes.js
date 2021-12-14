import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import About from '../views/About';
import ContactUs from '../views/ContactUs';
import Home from '../views/Home';
import ApplicationForm from '../Components/ApplicationForm';
import StatusCheck from '../Components/StatusCheck';

export default function UnauthenticatedRoutes({ user }) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contactUs" component={ContactUs} />
      <Route
        exact
        path="/application"
        component={ApplicationForm}
        user={user}
      />
      <Route exact path="/statuscheck" component={StatusCheck} user={user} />
    </Switch>
  );
}

UnauthenticatedRoutes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

UnauthenticatedRoutes.defaultProps = {
  user: null,
};
