import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!type.trim()) errors.type = "Type is required";
    if (!desc.trim()) errors.desc = "Description is required";
    return errors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = validate();
  setFormErrors(errors);

  if (Object.keys(errors).length > 0) return;

  const data = { title, type, desc };

  try {
    const response = await fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Check for duplicate title error from backend
      if (errorData.message === "Category title already exists") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          title: "This title already exists. Please choose a different one.",
        }));
        return;
      }

      throw new Error("Failed to create category");
    }

    navigate("/categories");
  } catch (error) {
    console.error("Error occurred:", error);
    alert("Failed to create category");
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="p-4 rounded bg-white w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4" style={{ color: "#1f87c2" }}>
          Add New Category
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {formErrors.title && (
              <div className="invalid-feedback">{formErrors.title}</div>
            )}
          </div>

          {/* Type */}
          <div className="mb-3">
            <label className="form-label">
              Type <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control ${formErrors.type ? "is-invalid" : ""}`}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            {formErrors.type && (
              <div className="invalid-feedback">{formErrors.type}</div>
            )}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${formErrors.desc ? "is-invalid" : ""}`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {formErrors.desc && (
              <div className="invalid-feedback">{formErrors.desc}</div>
            )}
          </div>

          {/* Buttons */}
          <div className="text-center mt-4">
            <div className="d-inline-flex gap-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
