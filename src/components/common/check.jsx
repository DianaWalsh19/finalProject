import React from "react";

const Check = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="">--Please select an option---</option>
        <option value="preMed" label="preMed" name="preMed" /> PreMed
        <option value="postMed" label="postMed" name="preMed" /> PostMed
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Check;
