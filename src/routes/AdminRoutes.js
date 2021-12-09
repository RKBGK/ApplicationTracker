import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Employees from '../views/Employees';
import Reports from '../views/Reports';
import Review from '../views/Review';

export default function AdminRoutes() {
  return (
    <Switch>
      <Route exact path="/employees" component={Employees} />
      <Route exact path="/review" component={Review} />
      <Route exact path="/reports" component={Reports} />
    </Switch>
  );
}
