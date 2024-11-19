// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";

// function Home() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/users")
//       .then((res) => setData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const navigate = useNavigate();

//   const handleDelete = (id) => {
//     const confirm = window.confirm("Would you like to delete this user?");
//     if (confirm) {
//       axios
//         .delete(`http://localhost:3000/users/${id}`)
//         .then((res) => {
//           console.log("Deleted:", res.data);
//           setData(data.filter((user) => user.id !== id));
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
//       <h1>List of Users</h1>
//       <div className="w-75 rounded bg-white border shadow p-4">
//         <div className="d-flex justify-content-end">
//           <Link to="/add" className="btn btn-success">
//             {" "}
//             Add +
//           </Link>
//         </div>
//         <table className="table table-striped table-bordered">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((d) => (
//               <tr key={d.id}>
//                 <td>{d.id}</td>
//                 <td>{d.name}</td>
//                 <td>{d.email}</td>
//                 <td>{d.phone}</td>
//                 <td>{d.address}</td>
//                 <td>
//                   <Link
//                     to={`/read/${d.id}`}
//                     className="btn btn-danger btn-sm me-2 "
//                   >
//                     Read
//                   </Link>
//                   <Link
//                     to={`/update/${d.id}`}
//                     className="btn btn-primary btn-sm me-2"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={(e) => handleDelete(d.id)}
//                     className="btn btn-danger btn-sm"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Home;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data); // Initialize filteredData with all users
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete this user?");
    if (confirm) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((res) => {
          console.log("Deleted:", res.data);
          const updatedData = data.filter((user) => user.id !== id);
          setData(updatedData);
          setFilteredData(updatedData);
        })
        .catch((err) => console.log(err));
    }
  };

  // Function to handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value) ||
        user.address.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by name, email, phone, or address"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Link to="/add" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>{d.address}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-danger btn-sm me-2 "
                  >
                    Read
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
