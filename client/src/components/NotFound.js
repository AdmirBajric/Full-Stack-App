import React from "react";
import { Link } from "react-router-dom";
// handle user friendly message when a request for the page can't be found
export default function NotFound() {
  return (
    <div className="bounds">
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link className="button" to="/">
        Home
      </Link>
    </div>
  );
}
