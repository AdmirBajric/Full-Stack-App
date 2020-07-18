import React from "react";
// import errorDisplay component for error handling
import ErrorDisplay from "./helpers/ErrorDisplay";

export default (props) => {
  // destructuring variables from the props
  const {
    change,
    cancel,
    errors,
    submit,
    submitButtonText,
    title,
    description,
    estimatedTime,
    materialsNeeded,
  } = props;
  // when form is submitted
  function handleSubmit(event) {
    // prevent browser to refresh the page
    event.preventDefault();
    // call submit function from the createCourse or updateCourse function
    submit();
  }
  // when form is canceled
  function handleCancel(event) {
    // prevent browser to refresh the page
    event.preventDefault();
    // call cancel function from the createCourse or updateCourse function
    cancel();
  }
  // return jsx
  return (
    <div>
      {/* render the errorDisplay component, if errors display to page */}
      <ErrorDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="input-title course--title--input"
                placeholder="Course title..."
                onChange={(event) => change(event)}
                value={title}
              />
            </div>
          </div>
          <div className="course--description">
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Course description..."
                onChange={(event) => change(event)}
                value={description}
              />
            </div>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    className="course--time--input"
                    placeholder="Hours"
                    onChange={(event) => change(event)}
                    value={estimatedTime}
                  />
                </div>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <div>
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    placeholder="List materials..."
                    onChange={(event) => change(event)}
                    value={materialsNeeded}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
