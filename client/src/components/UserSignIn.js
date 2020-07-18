import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserSignIn extends Component {
  // set state
  state = {
    email: "",
    password: "",
    errors: [],
  };

  render() {
    // destructuring variables from state
    const { email, password, errors } = this.state;

    let validation = null;
    // if errors set jsx to validation variable
    if (errors.length > 0) {
      validation = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>{errors}</ul>
          </div>
        </div>
      );
    }
    // return jsx
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          {validation}
          <form onSubmit={this.submit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={this.change}
              placeholder="Email Address"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.change}
              placeholder="Password"
            />
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign In
              </button>
              <button className="button-secondary" onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </form>
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
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
    // prevent browser for refreshing
    e.preventDefault();
    // use context from props to handle with the context.js and data.js
    const { context } = this.props;
    // sets path where user will be directed after sign in
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    // destructuring variable from state
    const { email, password } = this.state;
    // call singIn function from data.js
    context.actions
      .signIn(email, password)
      .then((user) => {
        // if user not exist set state errors with message
        if (user === null) {
          this.setState({ errors: ["Sign-in was unsuccessful"] });
        } else {
          // if course is created push to history
          this.props.history.push(from);
        }
      })
      // handle errors
      .catch((error) => {
        console.log(error);
        this.props.history.push("/error");
      });
  };
  // if button "cancel" is clicked push to history
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };
}
