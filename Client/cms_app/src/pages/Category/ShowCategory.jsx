import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/Mainlayout";
import ActionButton from "../../components/ActionButton";
import CategoryForm from "./CategoryForm";
import { Link } from 'react-router-dom';
import DeleteCategory from "./DeleteCategory";
import "../../index.css";
import ReactPaginate from "react-paginate";
import '../../components/Pagination.css';

function ShowCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [actionMessage, setActionMessage] = useState("");
  const [pageSortKey, setPageSortKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;

  const sortedCategories = [...categories].sort((a, b) => {
    if (!pageSortKey) return 0;
    return a[pageSortKey].localeCompare(b[pageSortKey]);
  });
  const offset = currentPage * usersPerPage;
  const currentCategories = sortedCategories.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(sortedCategories.length / usersPerPage);

const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};
  useEffect(() => {
    axios
      .get("http://localhost:8080/categories/getAll", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const result = res.data;
        if (Array.isArray(result.categories)) {
          setCategories(result.categories);
        } else {
          console.log("Unexpected response format", result);
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch data");
      });
  }, []);

  
useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);


  const handleCheckboxChange = (id) => {
    setSelectedCategoryId(id === selectedCategoryId ? null : id);
  };

  const handleNew = () => {
    setShowModal(true);
    navigate("/categories/new");
  };

  const handleEditClick = () => {
  
  setActionMessage(""); // Clear message
  navigate(`/categories/edit/${selectedCategoryId}`);
};

const handleDeleteNavigation = () => {
  
  setActionMessage(""); // Clear message
  navigate(`/categories/delete/${selectedCategoryId}`);
};

  const handleSortClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedCategories = [...categories].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return newOrder === "asc" ? -1 : 1;
      if (titleA > titleB) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setCategories(sortedCategories);
    setSortOrder(newOrder);
  };

  return (
    <MainLayout>
    <div className="container mt-4">
      <div className="d-flex justify-content-end mt-3">
        <ActionButton label="New" iconClass="bi bi-plus-lg" variant="light" onClick={handleNew} />
        <ActionButton label="Edit" iconClass="bi bi-pencil" variant="light" onClick={handleEditClick} disabled={!selectedCategoryId} />
        <ActionButton label="Delete" iconClass="bi bi-x-lg" variant="light" onClick={handleDeleteNavigation} disabled={!selectedCategoryId} />
      </div>
        
      <div>
        <h1 className="mb-0 title">
            <i class="bi bi-folder2"></i>  Category
        </h1>
        <hr />
        
        </div>
        <div
    className="px-3 py-2 border rounded"
    style={{
      width: "100%",
      maxWidth: "100%",
      backgroundColor: "#f0f0f0",
    }}
  >
    <strong>
      <Link to="/dashboard" className="text-decoration-none text-blue me-1">Dashboard</Link>
      / Category
    </strong>
  </div>
      
      

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>
              Category Title
              <button className="btn btn-sm btn-light ms-1" onClick={handleSortClick}>
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </th>
            {/* <th>Type</th>
            <th>Description</th> */}
          </tr>
        </thead>
       <tbody>
  {Array.isArray(categories) && categories.length === 0 ? (
    <tr>
      <td colSpan="2" className="text-center">No categories found.</td>
    </tr>
  ) : (
    currentCategories.map((category) => (
      <tr key={category._id}>
        <td>
          <input
            type="checkbox"
            checked={selectedCategoryId === category._id}
            onChange={() => handleCheckboxChange(category._id)}
          />
        </td>
        <td>
          <Link to={`/categories/details/${category._id}`} className="text-decoration-none text-primary">
            {category.title}
          </Link>
        </td>
      </tr>
    ))
  )}
</tbody>
</table>
    </div>
    <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
        />
    </MainLayout>
  );
}

export default ShowCategories;
