import Auth from "auth/auth";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrivateRoute = ({ component, ...rest }: any): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(true);

  useEffect(() => {
    Auth.isUserLogged().then((res) => {
      setIsLoggedIn(res)
      setIsBusy(false);
    });
  }, []);

  //TODO: loading screen
  return isBusy ? (
    <></>
  ) : isLoggedIn ? (
    <Route {...rest} component={component} render={undefined} />
  ) : (
    <Redirect to="/login" />
  );
};


export default PrivateRoute;
