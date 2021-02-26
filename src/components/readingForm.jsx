import React from "react";

const ReadingForm = ({ match, history }) => {
  return (
    <div>
      <h1>Reading details {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/readings")}
      >
        Save
      </button>
    </div>
  );
};

export default ReadingForm;
