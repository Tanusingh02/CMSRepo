import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = ({ customBrand }) => {
  const brandName = customBrand || "DCX CMS";
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  // Define nav items based on role
  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
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
    localStorage.removeItem("userRole");
    navigate('/login');
  };

  const navLinkStyle = (path) => ({
    color: "white",
    marginRight: "8px",
    padding: "8px 12px",
    backgroundColor: location.pathname.startsWith(path) ? "#075a99" : "transparent",
    transition: "background-color 0.3s ease",
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: "4px"
  });
  

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1f87c2', padding: '10px', width: '100%' }}>
      <Link className="navbar-brand text-white" to="/dashboard">DCX CMS</Link>
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

      <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
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
            className="d-flex gap-2 mt-2 mt-lg-0"
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
              className="btn btn-light"
              style={{ color: "#075a99" }}
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
          <li className="nav-item ms-3">
            <Link
              className="nav-link text-white"
              to="/"
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
