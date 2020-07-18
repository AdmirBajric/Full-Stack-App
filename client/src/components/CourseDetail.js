import React, { Component } from "react";
import { Link } from "react-router-dom";
const ReactMarkdown = require("react-markdown");

export default class CourseDetail extends Component {
  // set state
  state = {
    course: [],
    user: [],
  };
  // call fetchCourse to fetch the data
  componentDidMount() {
    this.fetchCourse();
  }
  // fetch the data
  fetchCourse = async () => {
    // use context from props to handle with the context.js and data.js
    const { context } = this.props;
    const id = this.props.match.params.id;

    try {
      // use the data for to course from the database
      const course = await context.data.getCourse(id);
      // if course message true the course not found (because: message returned is course not found)
      if (course.message) {
        this.props.history.push("/notfound");
      } else {
        // set state
        this.setState({ course: course.course, user: course.course.User });
      }
      // handling errors
    } catch (error) {
      console.log(error);
      this.props.history.push("/error");
    }
  };
  // delete the course
  handleDelete = (id) => {
    const { context } = this.props;
    const emailAddress = this.props.context.authenticatedUser.user.emailAddress;
    const password = this.props.context.authenticatedUser.password;
    // confirm the delete option
    const confirm = window.confirm(
      "Are you sure you wish to delete this course?"
    );
    if (confirm) {
      context.data
        .deleteCourse(emailAddress, password, id)
        .then((data) => {
          if (data.status === 204) {
            // if success deleting push to history
            this.props.history.push("/");
          }
        })
        // handle the errors
        .catch((error) => {
          this.props.history.push("/error");
        });
    }
  };

  render() {
    // destructuring course variables
    const {
      id,
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state.course;

    const { firstName, lastName } = this.state.user;
    let buttons = null;
    // if authenticated user is true
    if (this.props.context.authenticatedUser) {
      // if authenticated user match the course owner, set the required buttons to show
      if (userId === this.props.context.authenticatedUser.user.id) {
        buttons = (
          <div className="grid-100">
            <span>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <button className="button" onClick={() => this.handleDelete(id)}>
                Delete Course
              </button>
            </span>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        );
      } else {
        buttons = (
          <div className="grid-100">
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        );
      }
    } else {
      buttons = (
        <div className="grid-100">
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      );
    }
    // return jsx and reactMarkdown
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">{buttons}</div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {`${firstName} ${lastName}`}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown source={materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
