import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';



const MainLayout = ({ children })=>{
    return(
    <div className="layout container">
      <Navbar />
      <div className="row">
        <div className="col-md-4">
          <Sidebar />
        </div>
        <div className="col-md-8">
          {children}
        </div>
        </div>
      </div>
    )
}

export default MainLayout;