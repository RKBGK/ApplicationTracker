import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/globals/home.scss';
// import ApplicationForm from '../Components/ApplicationForm';
// import StatusCheck from '../Components/StatusCheck';

export default function Home() {
  const history = useHistory();
  // const applink = () => {
  //   <Link to="/application" component={ApplicationForm} />;
  // };
  // const statuslink = () => {
  //   <Link to="/statuscheck" component={StatusCheck} />;
  // };
  return (
    <div className="homebtnStyle">
      <button
        className="btn btn-success"
        type="submit"
        onClick={() => history.push('/application')}
      >
        Start Application
      </button>
      <button
        className="btn btn-success"
        type="submit"
        onClick={() => history.push('statuscheck')}
      >
        Check Application Status
      </button>
    </div>
  );
}
