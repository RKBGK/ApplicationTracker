import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Navigation from '../Components/Navigation';
import Routes from '../routes';
import { createUser, checkUserExists } from '../api/data/userData';

function Initialize() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        checkUserExists(authed).then((response) => {
          const userObj = {
            fullName: authed.displayName,
            uid: authed.uid,
            role: authed.role,
            email: authed.email,
            firebaseKey: authed.firebaseKey,
          };
          if (response === 'create user') {
            const newUserOnj = {
              fullName: userObj.fullName,
              uid: userObj.uid,
              role: 'Client',
              email: userObj.email,
            };
            // IF NOT, CREATE A POST TO USERS THEN SET STATE
            createUser(newUserOnj).then((newUser) => {
              setUser(newUser);
            });
          } else {
            setUser(response);
          }
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <>
        <Navigation user={user} />
        <Routes user={user} />
        {/* <SignIn user={userInfoObj} /> */}
      </>
    </div>
  );
}

export default Initialize;
