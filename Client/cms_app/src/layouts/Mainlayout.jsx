import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const MainLayout = ({ title ,children })=>{
    return(
    <div className="layout">
       <Navbar/>
       <div className="main-content">
        <Sidebar/>
        <div className="page-content">
            <div className="page-container">
            <h1 className="page-title">{title}</h1>
            {children}
            </div>
            </div>
        </div>
       </div>
    )
}

export default MainLayout;