/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true); // Show modal on mount

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/categories/deleteCategory/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate("/categories");
    } catch (error) {
      console.error("Failed to delete category:", error.message);
      alert("Failed to delete category.");
      navigate("/categories");
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <>
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this category?</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={handleCancel} style={buttonStyle}>Cancel</button>
              <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: "#d9534f", color: "#fff" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Modal styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
};

const buttonStyle = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default DeleteCategory;
