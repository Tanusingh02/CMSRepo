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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/categories/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const category = res.data.categories?.[0] || res.data;
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
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.desc.trim()) newErrors.desc = "Description is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
    <MainLayout>
    <div className="d-flex  min-vh-100 bg-light">
      <div className="p-4 rounded bg-white w-100" style={{ maxWidth: "1000px",maxHeight:"1000px"}}>
        <h3 className="text-center mb-4" style={{ color: "#1f87c2" }}>
          Edit Category
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
            />
            {errors.title && (
              <div className="text-danger mt-1">{errors.title}</div>
            )}
          </div>

          {/* Type */}
          <div className="mb-3">
            <label className="form-label">
              Type <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`form-control ${errors.type ? "is-invalid" : ""}`}
            />
            {errors.type && (
              <div className="text-danger mt-1">{errors.type}</div>
            )}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">
              Description <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className={`form-control ${errors.desc ? "is-invalid" : ""}`}
            />
            {errors.desc && (
              <div className="text-danger mt-1">{errors.desc}</div>
            )}
          </div>

          {/* Buttons */}
          <div className="text-center mt-4">
            <div className="d-inline-flex gap-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
             
            </div>
          </div>
        </form>
      </div>
    </div>
    </MainLayout>
  );
}

export default EditCategory;
