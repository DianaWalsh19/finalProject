import React, { useState } from "react";

export default function medFilters({ items }) {
  function filterPreMed(items) {
    const filteredItems = items.filter((i) => i.preMed === "preMed");
    return { filteredItems, currentPage: 1 };
  }

  function filterPostMed(items) {
    const filteredItems = items.filter((i) => i.preMed === "postMed");
    return { filteredItems, currentPage: 1 };
  }

  return (
    <div className="col-3">
      <h3>Medication Filters</h3>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={filterPreMed}
        >
          Pre-Medication
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={filterPostMed}
        >
          Post-Medication
        </button>
      </div>
    </div>
  );
}
