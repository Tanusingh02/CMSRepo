import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import MainLayout from "../layouts/Mainlayout";
import "../index.css";

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [users, setUsers] = useState([]);
  const [pageSortKey, setPageSortKey] = useState(null);
  const [userSortKey, setUserSortKey] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;

  const sortedPages = [...pages].sort((a, b) => {
    if (!pageSortKey) return 0;
    return a[pageSortKey].localeCompare(b[pageSortKey]);
  });

  const sortedUsers = [...users].sort((a, b) => {
    if (!userSortKey) return 0;
    return a[userSortKey].localeCompare(b[userSortKey]);
  });

  // Paginated users
  const offset = currentPage * usersPerPage;
  const currentUsers = sortedUsers.slice(offset, offset + usersPerPage);
  const currentPages = sortedPages.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(sortedUsers.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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

    axios
      .get("http://localhost:8080/pages/getAll", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setPages(res.data))
      .catch((error) => console.error("Error fetching latest pages:", error));
  }, []);

  return (
    <MainLayout>
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard
        </h1>
        <hr />
        <h3>Latest Pages</h3>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" onClick={() => setPageSortKey("title")}>
                Page Title
              </th>
              <th scope="col" onClick={() => setPageSortKey("category")}>
                Category
              </th>
              <th scope="col" onClick={() => setPageSortKey("author")}>
                Author
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPages.map((pages, index) => (
              <tr key={index}>
                <td data-label="Page Title">
                  <Link to={`/pages/${pages.id}`} className="text-link">
                    {pages.page_title}
                  </Link>
                </td>
                <td data-label="Email">{pages.category}</td>
                <td data-label="Group">{pages.author}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/pages">
          <button className="view-button mb-2">View All Pages</button>
        </Link>

        <div className="mt-3">
          <hr />
          <h3>Latest Users</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" onClick={() => setUserSortKey("fullname")}>
                  Name
                </th>
                <th scope="col" onClick={() => setUserSortKey("email")}>
                  Email
                </th>
                <th scope="col" onClick={() => setUserSortKey("role")}>
                  Group
                </th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user, index) => (
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

        <Link to="/useraccount">
          <button className="view-button mb-5">View All Users</button>
        </Link>
      </div>
      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
      />
    </MainLayout>
  );
};

export default Dashboard;
