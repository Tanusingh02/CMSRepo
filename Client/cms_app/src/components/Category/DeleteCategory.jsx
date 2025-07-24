/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "../../index.css";

function DeleteCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!id) {
      setTimeout(() => {
        navigate("/categories");
      }, 1000);
      return;
    }
    setShowModal(true);
  }, [id, navigate]);

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
      {/* Custom Backdrop */}
      {showModal && <div className="custom-modal-backdrop"></div>}

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this category?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCategory;
