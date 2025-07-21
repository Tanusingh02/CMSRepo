import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const MainLayout = ({ children })=>{
    return(
    <div>
       <Navbar></Navbar>
       <Sidebar/>
        <div>
            
            <main >
                {children}
            </main>
        </div>
    </div>
    )
}

export default MainLayout;