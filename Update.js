

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    
    axios
      .get(`http://localhost:3000/users/${id}`) 
      .then((res) => {
        setData(res.data); 
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3000/users/${id}`, data)
      .then((res) => {
        console.log(res);
        navigate("/"); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={data.name} 
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={data.email} 
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              className="form-control"
              placeholder="Enter Phone Number"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={data.address}
              className="form-control"
              placeholder="Enter Address"
              onChange={(e) => setData({ ...data, address: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
