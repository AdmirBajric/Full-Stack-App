import React from "react";
import { Link } from "react-router-dom";

export default function Header({ context }) {
  // set variable for the authenticated user
  const authUser = context.authenticatedUser;
  // return jsx
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {/* if authenticated user true, render welcome message and singOut button */}
          {/* when authenticated user not exist, render the singIn and singUp button */}
          {authUser ? (
            <React.Fragment>
              <span>Welcome, {authUser.user.firstName} !</span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
              <Link className="signin" to="/signin">
                Sign In
              </Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
}
