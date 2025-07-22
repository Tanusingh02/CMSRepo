import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import PageForm from "../Pages.component/PageForm";
import EditPage from "../Pages.component/EditPage";
import MainLayout from "../../layouts/Mainlayout";
import ActionButton from "../buttoncomponent";
import 'bootstrap-icons/font/bootstrap-icons.css';


function ShowPages() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:8080/pages/getAll")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        // console.log(result);
        setPages(result);
      })
      .catch((error) => {
        console.log("Error fetching ", error);
        setError("Failed to fetch data");
      });
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedPageId(id === selectedPageId ? null : id);
  };

  const handleEditClick = () => {
    if (!selectedPageId) {
      alert("Please select a page to edit");
      return;
    }
    navigate(`/pages/edit/${selectedPageId}`);
  };
  useEffect(() => {
    fetch("http://localhost:8080/pages/getAll")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        // console.log(result);
        setPages(result);
      })
      .catch((error) => {
        console.log("Error fetching ", error);
        setError("Failed to fetch data");
      });
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedPageId(id === selectedPageId ? null : id);
  };

  const handleEditClick = () => {
    if (!selectedPageId) {
      alert("Please select a page to edit");
      return;
    }
    navigate(`/pages/edit/${selectedPageId}`);
  };

  const handleDeleteNavigation = () => {
    if (!selectedPageId) {
      alert("Please select a page to delete");
      return;
    }
    navigate(`/pages/delete/${selectedPageId}`);
  };
  const handleDeleteNavigation = () => {
    if (!selectedPageId) {
      alert("Please select a page to delete");
      return;
    }
    navigate(`/pages/delete/${selectedPageId}`);
  };

  const handleSortClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedPages = [...pages].sort((a, b) => {
      const titleA = a.page_title.toLowerCase();
      const titleB = b.page_title.toLowerCase();
      if (titleA < titleB) return newOrder === "asc" ? -1 : 1;
      if (titleA > titleB) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setPages(sortedPages);
    setSortOrder(newOrder);
  };
  const handleSortClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedPages = [...pages].sort((a, b) => {
      const titleA = a.page_title.toLowerCase();
      const titleB = b.page_title.toLowerCase();
      if (titleA < titleB) return newOrder === "asc" ? -1 : 1;
      if (titleA > titleB) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setPages(sortedPages);
    setSortOrder(newOrder);
  };

  return (
    <div>
      <MainLayout>
        <div className="container mt-4">
          <h2 className="mb-0">
                    <i className="bi bi-file-earmark-fill me-2" style={{ color: "#3d85b1" }}></i>
                    <span style={{ color: "#3d85b1" }}>Pages</span>
                    </h2>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/pages/add" className="btn btn-light me-2">
              <i className="me-1 bi bi-plus-lg"></i> New
            </Link>
            {/* <button className="btn btn-primary me-2" onClick={handleEditClick} disabled={!selectedPageId}>Edit</button> */}
            <ActionButton
              label="Edit"
              iconClass="bi bi-plus-lg"
              variant="light"
              onClick={handleEditClick}
              disabled={!selectedPageId}
            />
            {/* <button className="btn btn-danger me-2" onClick={handleDeleteNavigation} disabled={!selectedPageId}>Delete</button> */}
            <ActionButton
              label="Delete"
              iconClass="bi bi-trash"
              variant="light"
              onClick={handleDeleteNavigation}
              disabled={!selectedPageId}
            />
          </div>
          <div className="mb-3">
            <div
              className="px-3 py-2 border rounded"
              style={{
                width: "100%",
                maxWidth: "100%",
                backgroundColor: "#f0f0f0",
              }}
            >
              <strong><Link to="/" className="text-decoration-none text-blue me-1">
                   <span style={{ color: "#3d85b1" }}>Dashboard</span></Link>/Pages</strong>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">
                  <input type="checkbox"></input>
                </th>
                <th scope="col">
                  Page Title{" "}
                  <button
                    className="btn btn-sm btn-light ms-1"
                    onClick={handleSortClick}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </th>
                <th scope="col">Category</th>
                <th scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPageId === page._id}
                      onChange={() => handleCheckboxChange(page._id)}
                    ></input>
                  </td>
                  <td>{page.page_title}</td>
                  <td>{page.category}</td>
                  <td>{page.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MainLayout>
    </div>
  );
}
export default ShowPages;
