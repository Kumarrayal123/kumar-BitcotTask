import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!data.name || !data.email || !data.phone || !data.address) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:3000/users", data)
      .then((res) => {
        console.log("User added successfully:", res.data);
        navigate("/");
      })
      .catch((err) => console.error("Error adding user:", err));
  };

  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
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
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}required/>
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter Phone Number"
              onChange={(e) => setData({ ...data, phone: e.target.value })} required/>
            
          </div>
          <div className="mb-4">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter Address"
              onChange={(e) => setData({ ...data, address: e.target.value })} required/>
             
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Add;
