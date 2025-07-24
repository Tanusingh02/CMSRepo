import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import axios from "axios";
import ActionButton from "../components/ActionButton";
import AddUser from "../components/Login-Signup/Adduser";
import EditUserForm from "../components/EditUserForm";
import  "../index.css";
import MainLayout from "../layouts/Mainlayout";


function UserPage(){
const [users,setUsers]=useState([]);
//const [showModal, setShowModal] = useState(false);
const [editModalVisible, setEditModalVisible] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
//in order to track the selected id for edit aur delete
const [selectedUserId, setSelectedUserId] = useState(null);
const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate(); 
  useEffect(()=>{
   console.log("Token from localStorage:", localStorage.getItem("token"));
   axios.get("http://localhost:8080/user/latest-users", {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
})
.then((res) => setUsers(res.data))
.catch((error) =>
  console.error("error fetching latest users:", error)
);
  },[]);
 const handleNew = () => {
 navigate("/user/add");
};

const handleClose = () => {
  setShowModal(false);
};
const handleEdit = () => {
  const user = users.find((u) => u._id === selectedUserId);
  if (user) {
    setSelectedUser(user);
    setEditModalVisible(true);
  }
};
  const handleDelete = () => {
  
  setShowConfirmDelete(true); // open modal
};
const confirmDelete = async () => {
  try {
    await axios.delete(`http://localhost:8080/user/${selectedUserId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const res = await axios.get("http://localhost:8080/user/latest-users", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setUsers(res.data);
    setSelectedUserId(null);
    setShowConfirmDelete(false); // close modal
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete the user.");
    setShowConfirmDelete(false); // close modal anyway
  }
};

const cancelDelete = () => {
  setShowConfirmDelete(false);
};
    const handleUserAdded = () => {
  // Refetch users after adding one
  axios.get("http://localhost:8080/user/latest-users", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
  .then((res) => setUsers(res.data))
  .catch((error) => console.error("error fetching latest users:", error));

    setShowModal(false); // Close modal
  };
  const handleUserUpdated = () => {
    setEditModalVisible(false);
    axios
      .get("http://localhost:8080/user/latest-users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setUsers(res.data))
      .catch((error) => console.error("Error fetching updated users:", error));
  };

return(
  <MainLayout>
    <div className="container-fluid mt-4">
    <div className="d-flex justify-content-end gap-2 ">
            <ActionButton label="New" iconClass="bi bi-plus-lg" variant="light" onClick={handleNew}  />
            <ActionButton label="Edit"   iconClass="bi bi-pencil"  variant="light" onClick={handleEdit} disabled={!selectedUserId} />
            <ActionButton label="Delete" iconClass="bi bi-x-lg" variant="light" onClick={handleDelete} disabled={!selectedUserId}/>
        </div>
        <h1 className="mb-0 title">
            <i className="bi bi-people-fill me-2"></i>Users
        </h1>
       
         <div className="mb-3">
          <hr/>
  <div
    className="px-3 py-2 border rounded"
    style={{
      width: "100%",
      maxWidth: "100%",
      backgroundColor: "#f0f0f0",
    }}
  >
    <strong>
      <Link to="/dashboard" className="text-decoration-none text-blue me-1">Dashboard</Link>
      / Users
    </strong>
  </div>
</div>
{editModalVisible && selectedUser && (
  <div className="modal d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-md" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit User</h5>
          <button type="button" className="btn-close" onClick={() => setEditModalVisible(false)}></button>
        </div>
        <div className="modal-body">
          <EditUserForm user={selectedUser} onUserUpdated={handleUserUpdated} />
        </div>
      </div>
    </div>
  </div>
)}
{showConfirmDelete && (
  <>
    {/* Backdrop Overlay */}
    <div className="custom-modal-backdrop"></div>

    {/* Modal */}
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
      <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button type="button" className="btn-close" onClick={cancelDelete}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger btn-md"
              style={{fontWeight: "bold" }}
              onClick={confirmDelete}
            >
              Yes, Delete
            </button>
            <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)}
       <table className="table table-striped">
            <thead>
  <tr>
    <th>Select</th>
    <th>Full Name</th>
    <th >Email</th>
    <th>Group</th>
  </tr>
</thead>

            <tbody>
  {[...users]
    .sort((a, b) => a.fullname.localeCompare(b.fullname))
    .map((user, index) => (
      <tr key={index}>
        <td>
          <input
  type="checkbox"
  checked={selectedUserId === user._id}
  onChange={() => {
    setSelectedUserId(prevId => (prevId === user._id ? null : user._id));
  }}
/>
        </td>
        <td>
  <Link to={`/useraccount/${user._id}`} className="text-link">
    {user.fullname}
  </Link>
</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
  ))}
</tbody>

         </table>
      
    </div>
    </MainLayout>
);

};

export default UserPage;
