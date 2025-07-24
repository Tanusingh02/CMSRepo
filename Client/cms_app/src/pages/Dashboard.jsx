import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import MainLayout from "../layouts/Mainlayout";
import "../index.css";

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;
  
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
  
const sortedPages = [...pages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
const sortedUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
        <h1 className="dashboard-title">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard
        </h1>
        <hr />
        <h3>Latest Pages</h3>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" onClick={() => setPageSortKey("title")}>Page Title</th>
              <th scope="col" onClick={() => setPageSortKey("category")}>Category</th>
              <th scope="col" onClick={() => setPageSortKey("author")}>Author</th>
            </tr>
          </thead>
          <tbody>
            {currentPages.map((page, index) => (
              <tr key={index}>
                <td data-label="Page Title" className="searchable" dangerouslySetInnerHTML={{
                  __html: `<a href="/pages/${page.id}" class="text-link">${highlight(page.page_title)}</a>`
                }} />
                <td data-label="Category" className="searchable" dangerouslySetInnerHTML={{
                  __html: highlight(page.category)
                }} />
                <td data-label="Author" className="searchable" dangerouslySetInnerHTML={{
                  __html: highlight(page.author)
                }} />
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
                <th scope="col" onClick={() => setUserSortKey("fullname")}>Name</th>
                <th scope="col" onClick={() => setUserSortKey("email")}>Email</th>
                <th scope="col" onClick={() => setUserSortKey("role")}>Group</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td data-label="Name" className="searchable" dangerouslySetInnerHTML={{
                    __html: `<a href="/userAccounts/${user.id}" class="text-link">${highlight(user.fullname)}</a>`
                  }} />
                  <td data-label="Email" className="searchable" dangerouslySetInnerHTML={{
                    __html: highlight(user.email)
                  }} />
                  <td data-label="Group" className="searchable" dangerouslySetInnerHTML={{
                    __html: highlight(user.role)
                  }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/useraccount">
          <button className="view-button mb-5">View All Users</button>
        </Link>
      </div>

    
    </MainLayout>
  );
};

export default Dashboard;
