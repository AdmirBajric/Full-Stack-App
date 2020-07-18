import React, { Component } from "react";
import { Link } from "react-router-dom";
// import errorDisplay component for error handling
import ErrorDisplay from "./helpers/ErrorDisplay";

export default class UserSignUp extends Component {
  // set state
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  render() {
    // destructuring variables from state
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;
    // return jsx
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          {/* render the errorDisplay component, if errors display to page */}
          <ErrorDisplay errors={errors} />
          <div>
            <form onSubmit={this.submit}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.change}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.change}
                />
              </div>
              <div>
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={this.change}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.change}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.change}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <button
                  className="button button-secondary"
                  onClick={this.cancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link>
            to sign in!
          </p>
        </div>
      </div>
    );
  }
  // handle change event
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // set the state for the current event
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  // submit the form to create the course
  submit = (e) => {
    // prevent browser to refresh
    e.preventDefault();
    // use context from props to handle with the context.js and data.js
    const { context } = this.props;
    // destructuring variables from the state
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;
    // set course variable with required data
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    // check if password match
    if (password === confirmPassword) {
      // call createUser function from data.js
      context.data
        .createUser(user)
        .then((errors) => {
          // handle errors when the course is not updated
          if (errors.length) {
            let newErr = [];
            errors.map((err) => {
              newErr.push(Object.values(err));
              return newErr;
            });
            // set the state errors
            this.setState({ errors: newErr });
          } else {
            // if success singUp, call singIn function to log the user in and set cookies
            context.actions.signIn(emailAddress, password).then(() => {
              // push to history stack
              this.props.history.push("/");
            });
          }
        })
        // handle errors
        .catch((error) => {
          this.props.history.push("/error");
        });
      // if passwords not match set state with error message
    } else {
      this.setState({
        errors: ["Password don't match"],
      });
    }
  };
  // if button "cancel" is clicked push to history
  cancel = () => {
    this.props.history.push("/");
  };
}
