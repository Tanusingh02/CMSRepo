import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/Mainlayout";
import { Modal, Button } from "react-bootstrap";
import "../../styles/Pages_style.css";

function EditPage() {
  const { id } = useParams(); // Assuming the page ID is passed as a URL parameter
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    page_title: "",
    category: "",
    content: "",
    author: "",
  });

  const [categoryData, setCategoryData] = useState({
    categories: [],
    totalPages: 0,
    currentPage: 1,
  });
  const [authorData, setAuthorData] = useState([]);

  const [duplicateData, setDuplicateData] = useState(false);

 
  const [showAlert, setShowAlert] = useState(false);


  //checking validation
  const isFormValid =
    FormData.page_title.trim() !== "" &&
    FormData.category.trim() !== "" &&
    FormData.content.trim() !== "" &&
    FormData.author.trim() !== "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/pages/get/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("Fetched result:", result);
        setFormData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed", err);
        setError("Failed to fetch");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/pages/editPage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(FormData),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setShowAlert(true);
        setTimeout(() => navigate("/pages"), 2000); 

      })
      .catch((error) => {
        console.error("Error fetching page", err);
        setError("Failed to load page data");
      });
  };
  //handle input changes
  //submit updated data using pu
  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading page data...</h4>
      </div>
    );
  }

  return (
    <div>
      <MainLayout>
        <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
          <div
            className="p-3 p-md-4 rounded  bg-white w-100"
            style={{ maxWidth: "900px" }}>
            <h3 className="text-center mb-4 " style={{ color: " #1f87c2" }}>
              Update-Data
            </h3>
            {showAlert && (
            <div className="alert alert-primary" role="alert"><p>
                 Data successfully Edited !</p>
            </div>)}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  Page Title
                  <span className="required-asterisk" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="page_title"
                  value={FormData.page_title}
                  onChange={handleChange}
                  className="form-control"
                ></input>
              </div>
              <div className="mb-3 dropdown-wrapper">
                <label>
                  Category
                  <span className="required-asterisk" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={FormData.category}
                  onChange={handleChange}
                  className="form-control not-edit"
                  readOnly
                />
                <i className="bi bi-caret-down-fill"></i>
              </div>
              <div className="mb-3">
                <label>
                  Content
                  <span className="required-asterisk" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <textarea
                  name="content"
                  value={FormData.content}
                  onChange={handleChange}
                  row={6}
                  className="form-control"
                  style={{ resize: "vertical" }}
                />
              </div>
              <div className="mb-3 dropdown-wrapper">
                <label>
                  Author
                  <span className="required-asterisk" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={FormData.author}
                  onChange={handleChange}
                  className="form-control not-edit"
                  readOnly
                />
                <i className="bi bi-caret-down-fill"></i>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="btn btn-primary mt-2"
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
    </div>
  );
}
export default EditPage;
