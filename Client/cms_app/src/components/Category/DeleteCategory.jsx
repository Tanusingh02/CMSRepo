/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function DeleteCategory() {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert("No category selected");
      return;
    }

    fetch(`http://localhost:8080/categories/deleteCategory/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/categories"); // Navigate back to category listing
      })
      .catch((error) => {
        console.error("Delete failed", error);
        alert("Error deleting category");
      });
  }, [id]);

  return (
    
      <div className="text-center mt-5">
        <h4>Deleting category...</h4>
      </div>
    
  );
}

export default DeleteCategory;
