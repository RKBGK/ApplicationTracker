import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import ApplicationForm from '../Components/ApplicationForm';
import StatusCheck from '../Components/StatusCheck';

export default function Home() {
  const history = useHistory();
  // const applink = () => {
  //   <Link to="/application" component={ApplicationForm} />;
  // };
  const statuslink = () => {
    <Link to="/statuscheck" component={StatusCheck} />;
  };
  return (
    <div>
      <button
        className="btn btn-success"
        type="submit"
        onClick={() => history.push('/application')}
      >
        Start Application
      </button>
      <button className="btn btn-success" type="submit" onClick={statuslink}>
        Check Application Status
      </button>
    </div>
  );
}
