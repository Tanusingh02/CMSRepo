import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const isFormValid =
    formData.title.trim() !== "" &&
    formData.type.trim() !== "" &&
    formData.desc.trim() !== "";

  useEffect(() => {
    fetch(`http://localhost:8080/categories/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const category = data.categories?.[0] || data;
        setFormData(category);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load category", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

    fetch(`http://localhost:8080/categories/editCategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setShowAlert(true);
        setTimeout(() => navigate("/categories"), 2000);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update category");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading category data...</h4>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
        <div className="p-3 p-md-4 rounded bg-white w-100" style={{ maxWidth: "900px" }}>
          <h3 className="text-center mb-4" style={{ color: "#1f87c2" }}>
            Edit Category
          </h3>

          {showAlert && (
            <div className="alert alert-success" role="alert">
              <p>Category successfully updated!</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label>
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Type */}
            <div className="mb-3">
              <label>
                Type <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`form-control ${errors.type ? "is-invalid" : ""}`}
              />
              {errors.type && <div className="invalid-feedback">{errors.type}</div>}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label>
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                rows={4}
                className={`form-control ${errors.desc ? "is-invalid" : ""}`}
                style={{ resize: "vertical" }}
              />
              {errors.desc && <div className="invalid-feedback">{errors.desc}</div>}
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={!isFormValid}
              >
                Update
              </button>
              {!isFormValid && (
                <small className="text-muted d-block mt-2">
                  Please fill out all fields to enable Update.
                </small>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditCategory;
