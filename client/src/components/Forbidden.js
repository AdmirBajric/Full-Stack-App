import React from "react";
import { Link } from "react-router-dom";
// handle user friendly message when a user can't access the required page
export default function UnhandledError() {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Oh oh! You can't access this page.</p>
      <Link className="button" to="/">
        Home
      </Link>
    </div>
  );
}
