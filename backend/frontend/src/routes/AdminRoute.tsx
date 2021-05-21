import Auth from "auth/auth";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AdminRoute = ({ component, ...rest }: any): JSX.Element => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(true);

  useEffect(() => {
    Auth.isUserAdmin().then((res) => {
      setIsAdmin(res)
      setIsBusy(false);
    });
  }, []);

  //TODO: loading screen
  return isBusy ? (
    <></>
  ) : isAdmin ? (
    <Route {...rest} component={component} render={undefined} />
  ) : (
    <Redirect to="/user" />
  );
};


export default AdminRoute;