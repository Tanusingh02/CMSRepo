import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';



const MainLayout = ({ title, children }) => {
  return (
    <div className="layout">
      <header>
        <Navbar/>
      </header>
      <div className="container-fluid">
        <div className="row flex-column flex-md-row">
          {/* Sidebar: full width on small screens, 4 columns on md+ */}
          <aside className="col-12 col-md-4 mb-3 mb-md-0">
            <Sidebar />
          </aside>

          {/* Main content: full width on small screens, 8 columns on md+ */}
          <main className="col-12 col-md-8">
            {title && <h1 className="page-title">{title}</h1>}
            {children}
          </main>
        </div>
        </div>
        <footer className="footer">
      <div>Copyright 2017, All Rights Reserved</div>
    </footer>
      </div>
    )
}

export default MainLayout;
