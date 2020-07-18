import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";
// render component if authenticated user is true, redirects to singIn page if false, when user is singIn, redirect to page where the user has try to access
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
