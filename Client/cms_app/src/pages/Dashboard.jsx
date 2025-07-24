
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import "../index.css";

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/latest-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
          userRole: userRole,
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

  useEffect(() => {
    const handleSearch = (e) => {
      setSearchKeyword(e.detail.toLowerCase());
    };

    window.addEventListener("searchKeyword", handleSearch);
    return () => window.removeEventListener("searchKeyword", handleSearch);
  }, []);

  const highlight = (text) => {
    if (!searchKeyword) return text;
    const regex = new RegExp(`(${searchKeyword})`, "gi");
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  };

  const sortedPages = [...pages].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const sortedUsers = [...users].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredPages = sortedPages.filter((page) =>
    [page.page_title, page.category, page.author].some((field) =>
      field.toLowerCase().includes(searchKeyword)
    )
  );

  const filteredUsers = sortedUsers.filter((user) =>
    [user.fullname, user.email, user.role].some((field) =>
      field.toLowerCase().includes(searchKeyword)
    )
  );

  const offset = currentPage * usersPerPage;
  const currentPages = filteredPages.slice(offset, offset + usersPerPage);
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <MainLayout>
      <div className="dashboard-header">
        <h1 className="title">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard
        </h1>
        <hr />
        <h3 className="title">Latest Pages</h3>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Page Title</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            {currentPages.length > 0 ? (
              currentPages.map((page, index) => (
                <tr key={index}>
                  <td
                    data-label="Page Title"
                    className="searchable"
                    dangerouslySetInnerHTML={{
                      __html: `<a href="/page-details/${page._id}" class="text-link">${highlight(
                        page.page_title
                      )}</a>`,
                    }}
                  />
                  <td
                    data-label="Category"
                    className="searchable"
                    dangerouslySetInnerHTML={{ __html: highlight(page.category) }}
                  />
                  <td
                    data-label="Author"
                    className="searchable"
                    dangerouslySetInnerHTML={{ __html: highlight(page.author) }}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No pages found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <Link to="/pages">
                <button className="view-button mb-5">View All Pages</button>
              </Link>

        <div className="mt-3">
          <hr />
          {userRole === "admin" && (
            <>
              <h3 className="title">Latest Users</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Group</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={index}>
                        <td
                          data-label="Name"
                          className="searchable"
                          dangerouslySetInnerHTML={{
                            __html: `<a href="/useraccount/${user._id}" class="text-link">${highlight(
                              user.fullname
                            )}</a>`,
                          }}
                        />
                        <td
                          data-label="Email"
                          className="searchable"
                          dangerouslySetInnerHTML={{ __html: highlight(user.email) }}
                        />
                        <td
                          data-label="Group"
                          className="searchable"
                          dangerouslySetInnerHTML={{ __html: highlight(user.role) }}
                        />
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center ">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Link to="/useraccount">
                <button className="view-button mb-5">View All Users</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
