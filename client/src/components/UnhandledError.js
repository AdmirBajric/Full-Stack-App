import React from "react";
import { Link } from "react-router-dom";
// handle user friendly message when a unexpected error has occurred
export default function UnhandledError() {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <Link className="button" to="/">
        Home
      </Link>
    </div>
  );
}
