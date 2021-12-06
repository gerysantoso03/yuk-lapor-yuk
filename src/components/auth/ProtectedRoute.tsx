import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Redirect, RouteProps } from 'react-router';
import { Route } from 'react-router-dom';
import { app } from '../../firebase/firebaseConfig';

const ProtectedRoute = ({ ...props }: RouteProps) => {
  // assume user to be logged out
  const [loggedIn, setLoggedIn] = useState(false);

  // keep track to display a spinner while auth status is being checked
  const [checkingStatus, setCheckingStatus] = useState(true);

  // auth listener to keep track of user signing in and out
  useEffect(() => {
    getAuth(app()).onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }

      setCheckingStatus(false);
    });
  }, []);

  return (
    <>
      {checkingStatus ? (
        <p>Securing user authentication...</p>
      ) : loggedIn ? (
        <Route {...props} />
      ) : (
        <Redirect to="/splash-screen" />
      )}{' '}
    </>
  );
};

export default ProtectedRoute;
