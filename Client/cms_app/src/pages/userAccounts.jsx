import React, { useEffect, useState } from "react";
import axios from "axios";
import ActionButton from "../components/ActionButton";
import AddUser from "../components/Login-Signup/Adduser";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function UserPage(){
  const [users,setUsers]=useState([]);
  useEffect(()=>{
   console.log("Token from localStorage:", localStorage.getItem("token"));
   axios.get("http://localhost:8080/user/latest-users", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
.then((res) => setUsers(res.data))
.catch((error) =>
  console.error("error fetching latest users:", error)
);
  },[]);
  const handleNew =()=>{
    
  };
  const handleEdit =()=>{
    
    };
  
  const handleDelete =async()=>{

     
    };
return(
     <div className="w-100">
            <Navbar/>
    <div className="d-flex">
        <Sidebar/>
       
    <div className="container mt-4">
        <h2 className="mb-0">
            <i className="bi bi-people-fill me-2"></i>Users
        </h2>
        <div className="d-flex justify-content-start gap-2  mb-3  ">
            
            <ActionButton label="New" iconClass="bi bi-plus-lg" variant="secondary" onClick={handleNew}  />
            <ActionButton label="Edit" iconClass="bi bi-pencil" variant="secondary" onClick={handleEdit}/>
            <ActionButton label="Delete" iconClass="bi bi-x-lg" variant="secondary" onClick={handleDelete}/>
        </div>
         <table className="table table-bordered">
            <thead>
                <tr>
                    <th></th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Group</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index) =>{
                    return(
                         <tr key={index}>
                        <td><a>{user.fullname}</a></td>
                        <td><a>{user.email}</a></td>
                        <td><a>{user.role}</a></td>
                    </tr>
                    );
                })}
            </tbody>
         </table>
      
    </div>
    </div>
    </div>
);

};
export default UserPage;