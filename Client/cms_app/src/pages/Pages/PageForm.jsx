import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/Mainlayout";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../Pages_style.css";

const AddPageForm = () => {
  const navigate = useNavigate();
  const [page_title, setPageTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [categoryData, setCategoryData] = useState({
    categories: [],
    totalPages: 0,
    currentPage: 1,
  });
  const [authorData, setAuthorData] = useState([]);
  const [duplicateData,setDuplicateData]=useState(false);

  const [showAlert, setShowAlert] = useState(false);
  // Check if all fields are filled
  const isFormValid =
    page_title.trim() !== "" &&
    category.trim() !== "" &&
    content.trim() !== "" &&
    author.trim() !== "";

  useEffect(() => {
    fetch("http://localhost:8080/categories/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setCategoryData({
          categories: result.categories,
          totalPages: result.totalPages || 0,
          currentPage: result.currentPage || 1,
        });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/user/latest-users", {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((response) => setAuthorData(response))
      .catch((error) => console.error("error fetching latest users:", error));
  }, []);

  const add_pages = (e) => {
    e.preventDefault();
    setDuplicateData(false);
    const data = {
      page_title: page_title,
      category: category,
      content: content,
      author: author,
    };

    fetch("http://localhost:8080/pages/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.exists) {
          setDuplicateData(true);
          return;
        }
        fetch("http://localhost:8080/pages/addPage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            if (result.message === "Inserted") 
              {
              console.log(result.data);
              setShowAlert(true);
              setTimeout(() => navigate("/pages"), 2000);
            }
          })
          .catch((error) => {
            console.error("Error inserting data:", error);
            alert("Error inserting data");
          });
      })
      .catch((error) => {
        console.error("error checking data ", error);
        alert("Error checking for duplicates");
      });
  };
  return (
    <div>
      <MainLayout>
        <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
          <div
            className="p-3 p-md-4 rounded  bg-white w-100"
            style={{ maxWidth: "900px" }}>
            <h3 className="text-center mb-4 " style={{ color: " #1f87c2" }}>
              Add-Page</h3>

            {showAlert && (
            <div className="alert alert-success" role="alert"><p>
                 Data successfully Inserted!</p>
            </div>)}

            <form onSubmit={add_pages}>
              <div className="mb-3">
                <label>
                  Page Title
                  <span className="required-asterisk" style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={page_title}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="mb-3 dropdown-wrapper">
                <label>
                  Category
                  <span className="required-asterisk" style={{ color: "red" }}>*</span>
                </label>

                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select a category</option>
                  {categoryData.categories.map((cat) => (
                    <option key={cat.type} value={cat.type}>
                      {cat.type}
                    </option>
                  ))}
                </select>
                <i className="bi bi-caret-down-fill"></i>
              </div>

              <div className="mb-3">
                <label>
                  Content
                  <span className="required-asterisk" style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  row={6}
                  className="form-control"
                  style={{ resize: "vertical" }}/>
                  </div>

              <div className="mb-3 dropdown-wrapper">
                <label>Author<span className="required-asterisk" style={{ color: "red" }}>*</span></label>
                <select
                  className="form-control"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}>
                  <option value="">
                    Select an Author
                    <span className="required-asterisk"style={{ color: "red" }}>*</span>
                  </option>

                  {Array.isArray(authorData) &&
                    authorData.map((user) => (
                      <option key={user.email} value={user.fullname}>
                        {user.fullname}
                      </option>//authorData.map is not a function
                    ))}
                </select>
                <i className="bi bi-caret-down-fill"></i>
                {duplicateData && (<small className="text-danger d-block mt-2">This author-category combination already exists</small>)}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-100 w-md-auto mt-2"
                  disabled={!isFormValid}
                >
                  Add Page
                </button>
                {!isFormValid && (
                  <small className="text-muted d-block mt-2">
                    Please fill out all fields to enable submission.
                  </small>
                )}
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};
export default AddPageForm;
