  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import MainLayout from "../layouts/Mainlayout";
  import "../index.css";

  const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:8080/user/latest-users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setUsers(res.data))
        .catch((error) => console.error("Error fetching latest users:", error));
    }, []);

    return (
      // <MainLayout>

      // </MainLayout>
      <MainLayout>
        <div className="dashboard-header mt-5">
          <h1> <i className="bi bi-speedometer2 me-2"></i>Dashboard</h1>
          <hr/>
          <h3>Latest Pages</h3>
        
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Page Title </th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, index) => (
              <tr key={index}>
                <td data-label="Page Title">{page.title}</td>
                <td data-label="Category">{page.category}</td>
                <td data-label="Author">{page.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="view-button">View All Pages</button>
        
        <div className="mt-5">
        <hr/>
        <h3>Latest Users</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name </th>
              <th scope="col">Email</th>
              <th scope="col">Group</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td data-label="Name">
                  <Link to={`/userAccounts/${user.id}`} className="text-link">
                    {user.fullname}
                  </Link>
                </td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Group">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <button className="view-button mb-5">View All Users</button>
        </div>
      </MainLayout>
    );
  };

  export default Dashboard;
