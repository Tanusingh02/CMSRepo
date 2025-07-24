import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/categories/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            navigate("/404");
          } else if (err.response.status === 401) {
            setError("Unauthorized. Please log in.");
          } else {
            setError("An error occurred. Please try again later.");
          }
        } else if (err.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError("Error: " + err.message);
        }
        console.error("Axios error:", err);
      });
  }, [id, navigate]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!category) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Category Details</h2>
      <hr />
      <p><strong>Title:</strong> {category.title}</p>
      <p><strong>Type:</strong> {category.type}</p>
      <p><strong>Description:</strong> {category.desc}</p>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
}

export default CategoryDetails;
