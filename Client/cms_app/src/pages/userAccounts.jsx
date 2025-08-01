import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ActionButton from "../components/ActionButton";
import AddUser from "../components/Adduser";
import EditUserForm from "../components/EditUserForm";
import "../styles/index.css";
import ReactPaginate from "react-paginate";
import "../styles/Pagination.css";
import MainLayout from "../layouts/Mainlayout";
 
function UserPage() {
  const [users, setUsers] = useState([]);
  //const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  //in order to track the selected id for edit aur delete
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [pageSortKey, setPageSortKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;
 
  const sortedUsers = [...users].sort((a, b) => {
    if (!pageSortKey) return 0;
    return a[pageSortKey].localeCompare(b[pageSortKey]);
  });
 
  const offset = currentPage * usersPerPage;
  const currentPages = sortedUsers.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(sortedUsers.length / usersPerPage);
 
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
 
  const navigate = useNavigate();
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
  const handleNew = () => {
    navigate("/useraccount/add");
  };
 
  // eslint-disable-next-line no-unused-vars
  const handleClose = () => {
    setShowModal(false);
  };
  const handleEdit = () => {
    const user = users.find((u) => u._id === selectedUserId);
    if (user) {
      setSelectedUser(user);
   navigate(`/useraccount/edit/${selectedUserId}`);
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
  // eslint-disable-next-line no-unused-vars
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
    <MainLayout>
      <div className="container-fluid mt-4">
        <div className="d-flex justify-content-end  ">
          <ActionButton
            label="New"
            iconClass="bi bi-plus-lg"
            variant="light"
            onClick={handleNew}
          />
          <ActionButton
            label="Edit"
            iconClass="bi bi-pencil"
            variant="light"
            onClick={handleEdit}
            disabled={!selectedUserId}
          />
          <ActionButton
            label="Delete"
            iconClass="bi bi-x-lg"
            variant="light"
            onClick={handleDelete}
            disabled={!selectedUserId}
          />
        </div>
        <h1 className="mb-0 title">
          <i className="bi bi-people-fill me-2"></i>Users
        </h1>
 
        <div className="mb-3">
          <hr />
          <div
            className="px-3 py-2 border rounded"
            style={{
              width: "100%",
              maxWidth: "100%",
              backgroundColor: "#f0f0f0",
            }}
          >
            <strong>
              <Link
                to="/dashboard"
                className="text-decoration-none text-blue me-1"
              >
                Dashboard
              </Link>
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
        {showConfirmDelete && (
          <>
            {/* Backdrop Overlay */}
            <div className="custom-modal-backdrop"></div>
 
            {/* Modal */}
            <div
              className="modal d-block"
              tabIndex="-1"
              role="dialog"
              style={{ zIndex: 1050 }}
            >
              <div
                className="modal-dialog modal-sm modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={cancelDelete}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this user?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger btn-md"
                      style={{ fontWeight: "bold" }}
                      onClick={confirmDelete}
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={cancelDelete}
                    >
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
              <th>Email</th>
              <th>Group</th>
            </tr>
          </thead>
 
          <tbody>
            {currentPages
              .sort((a, b) => a.fullname.localeCompare(b.fullname))
              .map((user, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUserId === user._id}
                      onChange={() => {
                        setSelectedUserId((prevId) =>
                          prevId === user._id ? null : user._id
                        );
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
        {/* Pagination Component */}
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
        />
      </div>
    </MainLayout>
  );
}
 
export default UserPage;