import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import handleLogout from '../features/auth/components/LoginForm';
import Pages from './Pages.component/ShowPages';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#3aa8e8', padding: '10px 20px', width: '100%', fontSize: '15px' }}>
    <a className="navbar-brand text-white" href="#">DCX CMS</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
      {/* Left Nav Links */}
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link text-white" href="#">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/pages">Pages</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Categories</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">Users</a>
        </li>
      </ul>

      {/* Centered Search */}
      <div className="d-flex align-items-left mx-auto">
        <form className="form-inline">
          <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
         
        </form>
        <button className="btn btn-primary text-black" type="submit" style={{backgroundColor:'white'}}>Submit</button>
      </div>

      {/* Right Account Section */}
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            My Account
          </a>
          <div className="dropdown-menu dropdown-menu-left" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#">Profile</a>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/login" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;