import React, { Component } from "react";
import Form from "./Form";

export default class UpdateCourse extends Component {
  // set state
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    id: "",
    userId: "",
    errors: [],
  };
  // call fetchCourse to fetch the data
  componentDidMount() {
    this.fetchCourse();
  }
  // fetch the data
  fetchCourse = async () => {
    // variable is used to prevent the error when component is unmounted
    let isMounted = true;
    // use context from props to handle with the context.js and data.js
    const { context } = this.props;
    const id = this.props.match.params.id;

    try {
      // use the data for to course from the database
      const course = await context.data.getCourse(id);
      // if the course owner id not match the authenticated user, push to history stack to render the forbidden component
      if (course.course.userId !== context.authenticatedUser.user.id) {
        // set the variable to false
        isMounted = false;
        // push to history stack
        this.props.history.push("/forbidden");
      }
      // if variable is true set the state
      if (isMounted) {
        this.setState({
          title: course.course.title,
          description: course.course.description,
          estimatedTime: course.course.estimatedTime,
          materialsNeeded: course.course.materialsNeeded,
          id: course.course.id,
          userId: course.course.userId,
        });
      }
      // handle errors
    } catch (error) {
      console.log(error);
      this.props.history.push("/notfound");
    }
  };

  render() {
    // destructuring variables from the state
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
        <h1>Update Course</h1>
        <div>
          <Form
            change={this.change}
            cancel={this.cancel}
            submit={this.submit}
            errors={errors}
            submitButtonText="Update"
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
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id,
      userId,
    } = this.state;
    // set course variable with required data
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id,
      userId,
    };
    // call updateCourse function from data.js
    context.data
      .updateCourse(user.user.emailAddress, user.password, course)
      .then((data) => {
        // handle errors when the course is not updated
        if (data.errors) {
          let newErr = [];
          data.errors.map((err) => {
            newErr.push(Object.values(err));
            return newErr;
          });
          // set the state errors
          this.setState({ errors: newErr });
        } else {
          // if course is created push to history courses and the created id
          this.props.history.push(`/courses/${id}`);
        }
      })
      // handle other errors
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };
  // if button "cancel" is clicked push to history
  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  };
}
