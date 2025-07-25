import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import PageForm from "../Pages/PageForm";
import EditPage from "../Pages/EditPage";
import MainLayout from "../../layouts/Mainlayout";
import ActionButton from "../../components/ActionButton";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactPaginate from "react-paginate";
import '../../styles/Pagination.css';




function ShowPages() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSortKey, setPageSortKey] = useState(null);

  //userRole
   const userRole=localStorage.getItem('userRole');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;


  const sortedPages = [...pages].sort((a, b) => {
    if (!pageSortKey) return 0;
    return a[pageSortKey].localeCompare(b[pageSortKey]);
  });
 

 // Paginated users
  const offset = currentPage * usersPerPage;
  const currentPages = sortedPages.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(sortedPages.length / usersPerPage);
 
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

 //for getting all pages data 
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
        <div className="container">
          <div className="mt-4 d-flex justify-content-end mb-3">
            {userRole==="admin" && <Link to="/pages/add" className="btn btn-light me-2">
              <i className="me-1 bi bi-plus-lg"></i>New
            </Link>}
            {/* <button className="btn btn-primary me-2" onClick={handleEditClick} disabled={!selectedPageId}>Edit</button> */}
            {userRole==="admin" &&(<ActionButton
              label="Edit"
              iconClass="bi bi-pencil"
              variant="light"
              onClick={handleEditClick}
              disabled={!selectedPageId}
            />)}
            {/* <button className="btn btn-danger me-2" onClick={handleDeleteNavigation} disabled={!selectedPageId}>Delete</button> */}
            {userRole==="admin"&& (<ActionButton
              label="Delete"
              iconClass="bi bi-x-lg"
              variant="light"
              onClick={handleDeleteNavigation}
              disabled={!selectedPageId}
            />)}
          </div>
          <h1 className="mb-0">
            <i className="bi bi-file-earmark-fill me-2" style={{ color: "#3d85b1" }}></i>
            <span style={{ color: "#3d85b1" }}>Pages</span>
          </h1>
          <hr/>
          <div className="mb-3">
            <div
              className="px-3 py-2 border rounded"
              style={{
                width: "100%",
                maxWidth: "100%",
                backgroundColor: "#f0f0f0",
              }}>
              <strong><Link to="/dashboard" className="text-decoration-none text-blue me-1">
                   <span>Dashboard</span></Link>/Pages</strong>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Select
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
              {currentPages.map((page,index) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPageId === page._id}
                      onChange={() => handleCheckboxChange(page._id)}
                    ></input>
                  </td>
                  <td><Link to={`/pages/page-details/${page._id}`}>{page.page_title}</Link></td>
                  <td>{page.category}</td>
                  <td>{page.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         {/* Pagination Component */}
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
    </div>
  );
}
export default ShowPages;
