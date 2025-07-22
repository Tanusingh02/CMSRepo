import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import MainLayout from "../../layouts/Mainlayout";

function DeletePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!id) {
      alert("No page selected");
      navigate("/pages");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this page?");
    if (!confirmed) {
      navigate("/pages");
      return;
    }

    fetch(`http://localhost:8080/pages/deletePage/${id}`, {
      method: "DELETE"
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
  }, [id, navigate]);

  return (
    <MainLayout>
      <div className="text-center mt-5">
        <h4>Deleting page...</h4>
      </div>
    </MainLayout>
  );
}
export default DeletePage;