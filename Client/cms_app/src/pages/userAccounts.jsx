import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ActionButton from "../components/ActionButton";
import AddUser from "../components/Login-Signup/Adduser";
import EditUserForm from "../components/EditUserForm";
import MainLayout from "../layouts/Mainlayout";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  //in order to track the selected id for edit aur delete
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    console.log("Token from localStorage:", localStorage.getItem("token"));
    axios
      .get("http://localhost:8080/user/latest-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setUsers(res.data))
      .catch((error) => console.error("error fetching latest users:", error));
  }, []);
  useEffect(() => {
    document.body.classList.toggle("modal-open", showModal);
  }, [showModal]);

  const handleNew = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleEdit = () => {
    const user = users.find((u) => u._id === selectedUserId);
    if (user) {
      setSelectedUser(user);
      setEditModalVisible(true);
    } else {
      alert("Please select a user to edit.");
    }
  };
  const handleDelete = async () => {
    if (!selectedUserId) {
      alert("Please select a user to delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/user/${selectedUserId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      //  Refresh the user list
      const res = await axios.get("http://localhost:8080/user/latest-users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUsers(res.data);
      setSelectedUserId(null); // clear selection
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete the user.");
    }
  };
  const handleUserAdded = () => {
    // Refetch users after adding one
    axios
      .get("http://localhost:8080/user/latest-users", {
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

  return (
    // <div className="d-flex">
    //     <Sidebar/>
    <MainLayout>
      <div className="d-flex justify-content-end mt-3 ">
        <ActionButton
          className=""
          label="New"
          iconClass="bi bi-plus-lg"
          variant="secondary"
          onClick={handleNew}
        />
        <ActionButton
          label="Edit"
          iconClass="bi bi-pencil"
          variant="secondary"
          onClick={handleEdit}
          disabled={!selectedUserId}
        />
        <ActionButton
          label="Delete"
          iconClass="bi bi-x-lg"
          variant="secondary"
          onClick={handleDelete}
        />
      </div>
      <div className="container-fluid ">
        <h1 className="mb-0 dashboard-header">
          <i className="bi bi-people-fill me-2"></i>Users
        </h1>
        <hr />
        <div className="mb-3">
          <div
            className="px-3 py-2 border rounded"
            style={{
              width: "100%",
              maxWidth: "100%",
              backgroundColor: "#f0f0f0",
            }}
          >
            <strong>
              <Link to="/" className="text-decoration-none text-blue me-1">
                Dashboard
              </Link>
              / Users
            </strong>
          </div>
        </div>

        {showModal && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <AddUser onUserAdded={handleUserAdded} />
                </div>
              </div>
            </div>
          </div>
        )}

        {editModalVisible && selectedUser && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditModalVisible(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <EditUserForm
                    user={selectedUser}
                    onUserUpdated={handleUserUpdated}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Select</th>
              <th>Full Name</th>
              <th>Email</th>
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
                      onChange={() => setSelectedUserId(user._id)}
                    />
                  </td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </MainLayout>

    // </div>
  );
}
export default UserPage;
