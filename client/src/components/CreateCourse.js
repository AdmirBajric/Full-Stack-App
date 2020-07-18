import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  // set state
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };
  render() {
    // destructuring course variables
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;
    // return jsx
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
            change={this.change}
            cancel={this.cancel}
            submit={this.submit}
            errors={errors}
            submitButtonText="Create"
            title={title}
            description={description}
            estimatedTime={estimatedTime}
            materialsNeeded={materialsNeeded}
          />
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
  submit = () => {
    // use context from props to handle with the context.js and data.js
    const { context } = this.props;
    // set user variable from the current authenticated user
    const user = context.authenticatedUser;
    // destructuring variables from the state
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    // set course variable with required data
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: user.user.id,
    };
    // call createCourse function from data.js
    context.data
      .createCourse(user.user.emailAddress, user.password, course)
      .then((data) => {
        // handle errors when the course is not created
        if (data.errors) {
          let newErr = [];
          data.errors.map((err) => {
            newErr.push(Object.values(err));
            return newErr;
          });
          // set the state errors
          this.setState({ errors: newErr });
        } else {
          // if course is created push to history
          this.props.history.push("/");
        }
      })
      // handle other errors
      .catch((err) => {
        this.props.history.push("/error");
      });
  };
  // if button "cancel" is clicked push to history
  cancel = () => {
    this.props.history.push("/");
  };
}
