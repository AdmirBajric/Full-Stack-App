import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    // create instance for Data
    this.data = new Data();
  }
  // set state, when authenticated user or null
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
  };

  render() {
    // destructuring variable from state
    const { authenticatedUser } = this.state;
    // set value variable with authenticated user, data and actions for singIn and singOut functions
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
  // singIn function to log the user
  signIn = async (username, password) => {
    let user = await this.data.getUser(username, password);
    if (user) {
      user = { ...user, password };
      // set state with current authenticated user
      this.setState({ authenticatedUser: user });
      // set the cookies for the current user
      Cookies.set("authenticatedUser", JSON.stringify(user));
    }
    return user;
  };
  // singOut function to log out the user
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
