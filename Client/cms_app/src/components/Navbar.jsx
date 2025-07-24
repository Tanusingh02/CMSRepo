import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ customBrand }) => {
  const brandName = customBrand || "DCX CMS";
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Pages", path: "/pages" },
    { label: "Categories", path: "/categories" },
    { label: "Users", path: "/useraccount" },
  ];

  const navLinkStyle = (path) => ({
    color: "white",
    marginRight: "8px",
    padding: "8px 12px",
    backgroundColor: activeLink === path ? "#075a99" : "transparent",
    textDecoration: "none",
    cursor: "pointer",
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "rgba(31,135,194,255)",
        padding: "10px",
        width: "100%",
      }}
    >
      <Link className="navbar-brand text-white" to="/">
        {brandName}
      </Link>
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
            <div
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
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
