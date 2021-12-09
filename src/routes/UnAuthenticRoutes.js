import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../views/About';
import ContactUs from '../views/ContactUs';
import Home from '../views/Home';
import ApplicationForm from '../Components/ApplicationForm';
import StatusCheck from '../Components/StatusCheck';
import ReportChart from '../Components/ReportChart';
import AppCards from '../views/AppCards';
import EditApplication from '../views/EditApplication';
import DetailApp from '../views/DetailApp';

export default function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contactUs" component={ContactUs} />
      <Route exact path="/application" component={ApplicationForm} />
      <Route exact path="/statuscheck" component={StatusCheck} />
      <Route exact path="/reportchart" component={ReportChart} />
      <Route exact path="/appcard" component={AppCards} />
      <Route exact path="/editapp/:firebaseKey" component={EditApplication} />
      <Route exact path="/detailapp/:firebaseKey" component={DetailApp} />
    </Switch>
  );
}
