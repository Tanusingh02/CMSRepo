import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "../../layouts/Mainlayout";
 
function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    desc: "",
  });
 
  useEffect(() => {
    console.log("Token from localStorage:", localStorage.getItem("token"));
 
    axios
      .get(`http://localhost:8080/categories/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFormData(res.data);
        const category = res.data.categories?.[0]; // ✅ extract the first item
        if (category) {
          setFormData(category);
        } else {
          console.warn("No category found for ID:", id);
        }
      })
      .catch((err) => {
        console.error("Failed to load category", err.message);
      });
  }, [id]);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    axios
      .put(`http://localhost:8080/categories/editCategory/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Update successful:", res.data);
        navigate("/categories");
      })
      .catch((err) => {
        console.error("Update failed:", err.message);
        alert("Failed to update category");
      });
  };
 
  return (
    
          <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
         <div className="p-4 rounded bg-white w-100" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-4" style={{ color: "#1f87c2" }}>Edit Category</h3>
          <form onSubmit={handleSubmit}>
<div className="mb-3">
<label>Title</label>
<input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
</div>
<div className="mb-3">
<label>Type</label>
<input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-control"
              required
            />
</div>
<div className="mb-3">
<label>Description</label>
<input type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="form-control"
              required
            />
</div>
<div className="text-center">
<button type="submit" className="btn btn-primary mt-2">Update</button>
</div>
</form>
</div>
</div>

  );
}
 
export default EditCategory;