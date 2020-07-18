import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
// singOut the user
export default ({ context }) => {
  // one way that I have found to prevent error when component attempts to set state in render
  useEffect(() => context.actions.signOut());

  return <Redirect to="/" />;
};
