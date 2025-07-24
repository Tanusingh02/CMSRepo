import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              onInvalid={(e) => e.target.setCustomValidity("Please fill out the title")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          {/* Type */}
          <div className="mb-3">
            <label className="form-label">
              Type <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              onInvalid={(e) => e.target.setCustomValidity("Please fill out the type")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              onInvalid={(e) => e.target.setCustomValidity("Please fill out the description")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          {/* Centered Buttons */}
          <div className="text-center mt-4">
            <div className="d-inline-flex gap-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/categories")}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
