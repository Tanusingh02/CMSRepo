import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import handleLogout from '../features/auth/components/LoginForm';

  const Navbar = ({ customBrand }) => {
    const brandName = customBrand || "DCX CMS";

    const [activeLink, setActiveLink] = useState(null);
const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const navLinkStyle = (label) => ({
    color: 'white',
    marginRight: '8px',
    padding: '8px 12px',
    backgroundColor: activeLink === label ? '#075a99' : 'transparent',
    height: activeLink === label ? '100%' : '20%',
    textDecoration: 'none',
    cursor: 'pointer'
  });

    return (
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#3aa8e8', padding: '10px'  , width: '100%' }}>
        <a className="navbar-brand text-white" href="#">
        {brandName}
      </a>

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgba(31,135,194,255)', padding: '10px', width: '100%' }}>
      <a className="navbar-brand text-white" href="#">DCX CMS</a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        {/* Left Nav Links + Search */}
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
          <ul className="navbar-nav d-flex flex-row flex-wrap">
            {['Dashboard', 'Pages', 'Categories', 'Users'].map((label) => (
              <li className="nav-item" key={label}>
                <a
                  className="nav-link"
                  href="#"
                  style={navLinkStyle(label)}
                  onClick={() => setActiveLink(label)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Search */}
          <form className="form-inline d-flex align-items-center mt-2 mt-lg-0 ml-lg-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ marginRight: '5px' }}
            />
            <button
              className="btn btn-primary text-black"
              type="submit"
              style={{ backgroundColor: 'white' }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Account Section */}
        <ul className="navbar-nav d-flex flex-row align-items-center mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Account
            </a>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#" >Profile</a>
            </div>
          </li>
          <li className="nav-item ml-3">
            <a className="nav-link text-white" href="/login" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
