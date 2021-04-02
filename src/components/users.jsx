import React from "react";

const Users = () => {
  return (
    <div className="row">
      <h3>My Records</h3>
      <div className="col-3">
        <div>
          <button type="button" className="btn btn-primary btn-lg btn-block">
            See All Readings
          </button>
        </div>
      </div>
      <div className="col-3">
        <div>
          <button type="button" className="btn btn-primary btn-lg btn-block">
            See Graph
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
