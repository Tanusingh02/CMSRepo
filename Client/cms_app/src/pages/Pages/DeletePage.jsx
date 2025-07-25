import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MainLayout from "../../layouts/Mainlayout";

function DeletePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [showModal, setShowModal] = useState();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!id) {
      setTimeout(() => {
        navigate("/pages");
      }, 1000);
      return;
    }
    setShowModal(true);
  }, [id, navigate]);
  const handleDelete = () => {
    fetch(`http://localhost:8080/pages/deletePage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/pages");
      })
      .catch((error) => {
        console.error("Delete failed", error);
        alert("Error deleting page");
        navigate("/pages");
      });
  };
  const handleCancel = () => {
    navigate("/pages");
  };

  return (
    <MainLayout>
      <Modal show={showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this page?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </MainLayout>
  );
}
export default DeletePage;
