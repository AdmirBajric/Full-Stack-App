import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Courses extends Component {
  // set state
  state = {
    courses: [],
  };
  // call fetchCourse to fetch the data
  componentDidMount() {
    this.fetchAllCourses();
  }
  // fetch the data
  fetchAllCourses = async () => {
    // use context from props to handle with the context.js and data.js
    const { context } = this.props;

    try {
      // use the data for to courses from the database
      const courses = await context.data.getCourses();
      // set state with the courses data
      this.setState({ courses });
      // handle errors
    } catch (error) {
      console.log(error);
      this.props.history.push("/error");
    }
  };

  render() {
    // return jsx
    return (
      <div className="bounds">
        {this.state.courses.map((course) => (
          <div key={course.id} className="grid-33">
            <Link
              className="course--module course--link"
              to={`/courses/${course.id}`}
            >
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </div>
        ))}
        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}
