import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3>User Details</h3>
        <div className="mb-2">
          <strong>Name: </strong>
          <span>{data.name}</span>
        </div>
        <div className="mb-2">
          <strong>Email: </strong>
          <span>{data.email}</span>
        </div>
        <div className="mb-3">
          <strong>Phone: </strong>
          <span>{data.phone}</span>
        </div>
        <div className="mb-2">
          <strong>Address: </strong>
          <span>{data.address}</span>
        </div>

        <Link to={`/update/${id}`} className="btn btn-success">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary ms-3">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Read;
