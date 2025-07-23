/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete this category?");
      // if (!confirmDelete) {
      //   navigate("/categories");
      //   return;
      // }

      try {
        await axios.delete(`http://localhost:8080/categories/deleteCategory/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        alert("Category deleted successfully.");
        navigate("/categories");
      } catch (error) {
        console.error("Failed to delete category:", error.message);
        alert("Failed to delete category.");
        navigate("/categories");
      }
    };

    confirmAndDelete();
  }, [id, navigate]);

  return null; // No UI needed
}

export default DeleteCategory;
