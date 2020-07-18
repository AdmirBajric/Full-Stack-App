import React from "react";

// error handling function
export default function ErrorDisplay(props) {
  const { errors } = props;

  let errorsDisplay = null;

  if (errors.length) {
    const error = errors.map((err, i) => <li key={i}>{err}</li>);
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>{error}</ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
