import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";


const Navbar = ({ customBrand }) => {
  const brandName = customBrand || "DCX CMS";
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);

  const userRole = localStorage.getItem("userRole"); // ✅ Get role from storage

  // Define nav items based on role
  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Pages', path: '/pages' },
  ];

  // Add admin-only links
  if (userRole === 'admin') {
    navItems.push(
      { label: 'Categories', path: '/categories' },
      { label: 'Users', path: '/useraccount' }
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("userRole"); // 🚫 Remove role on logout
    navigate('/login');
  };

  const navLinkStyle = (path) => ({
    color: "white",
    marginRight: "8px",
    padding: "8px 12px",
    backgroundColor: activeLink === path ? "#075a99" : "transparent",
    textDecoration: "none",
    cursor: "pointer",
  });
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgba(31,135,194,255)', padding: '10px', width: '100%' }}>
      <a className="navbar-brand text-white" href="#">DCX CMS</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        {/* Left Nav Links + Search */}
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
          <ul className="navbar-nav d-flex flex-row flex-wrap">
            {/* {navItems.map((item) => (
              <li className="nav-item" key={item.label}>
                <a
                  className="nav-link"
                  href="#"
                  style={navLinkStyle(item.label)}
                  onClick={() => {
                    setActiveLink(item.label);
                    navigate(item.path); // 👈 Navigate to page
                  }}
                >
                  {item.label}
                </a> */}
            {navItems.map(({ label, path }) => (
              <li className="nav-item" key={label}>
                <Link to={path} className="nav-link" style={navLinkStyle(path)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search */}
          <form
            className="d-flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const keyword = e.target.elements.search.value.trim();
              const event = new CustomEvent("searchKeyword", {
                detail: keyword,
              });
              window.dispatchEvent(event);
            }}
          >
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="form-control"
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Submit
            </button>
          </form>
        </div>
        {/* Right Account Section */}
        <ul className="navbar-nav d-flex flex-row align-items-center mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              My Account
            </a>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/profile') }}>
                Profile
              </a>
            </div>
          </li>
          <li className="nav-item ml-3">
            <Link
              className="nav-link text-white"
              to="/login"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;