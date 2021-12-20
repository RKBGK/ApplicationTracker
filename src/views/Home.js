import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/globals/home.scss';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
// import ApplicationForm from '../Components/ApplicationForm';
// import StatusCheck from '../Components/StatusCheck';
const HomeButton = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 50px;
  height: 30vmin;
  width: 50%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  margin: 20px;

  h2 {
    text-align: center;
  }
`;

export default function Home() {
  const history = useHistory();
  // const applink = () => {
  //   <Link to="/application" component={ApplicationForm} />;
  // };
  // const statuslink = () => {
  //   <Link to="/statuscheck" component={StatusCheck} />;
  // };
  return (
    <HomeButton className="homebtnStyle">
      <Card
        body
        style={{
          width: '70%',
          backgroundColor: 'rgb(213, 248, 248)',
          border: '0px',
        }}
      >
        <button
          className="btn btn-light"
          type="submit"
          onClick={() => history.push('/application')}
        >
          Start Application
        </button>
      </Card>
      <Card
        body
        style={{
          width: '70%',
          backgroundColor: 'rgb(213, 248, 248)',
          border: '0px',
        }}
      >
        <button
          className="btn btn-light"
          type="submit"
          onClick={() => history.push('statuscheck')}
        >
          Check Application Status
        </button>
      </Card>
    </HomeButton>
  );
}
