
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../layouts/Mainlayout";

function DeletePage() {
  const { id } = useParams(); // Get page ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert("No page selected");
      return;
    }

    fetch(`http://localhost:8080/pages/deletePage/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        return res.json()})
      .then((data) => {
        navigate("/pages"); // Navigate back to listing
      })
      .catch((error) => {
        console.error("Delete failed", error);
        alert("Error deleting page");
      });
  }, [id]);

  return (
     <MainLayout>
    <div className="text-center mt-5">
      <h4>Deleting page...</h4>
    </div>
     </MainLayout>
  );
}

export default DeletePage;
