import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Employees from '../views/Employees';
import Reports from '../views/Reports';
import Summary from '../views/Summary';
import ReportChart from '../Components/ReportChart';
import AppCards from '../views/AppCards';
import EditApplication from '../views/EditApplication';
import DetailApp from '../views/DetailApp';

export default function AdminRoutes({ user }) {
  return (
    <Switch>
      <Route exact path="/employees" component={Employees} />
      <Route exact path="/summary" component={Summary} />
      <Route exact path="/reports" component={Reports} />
      <Route exact path="/reportchart" component={ReportChart} />
      <Route exact path="/appcard" component={() => <AppCards user={user} />} />
      <Route
        exact
        path="/editapp/:firebaseKey"
        component={() => <EditApplication user={user} />}
      />
      <Route exact path="/detailapp/:firebaseKey" component={DetailApp} />
    </Switch>
  );
}

AdminRoutes.propTypes = {
  user: PropTypes.shape(PropTypes.obj).isRequired,
};
