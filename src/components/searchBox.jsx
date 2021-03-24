import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Is this PreMedication? Y/N"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
