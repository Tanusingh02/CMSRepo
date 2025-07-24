import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import MainLayout from "../../layouts/Mainlayout";
import ActionButton from "../ActionButton";

function ShowPages() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
        <div className="mb-3">
          <div
            className="px-3 py-2 border rounded"
            style={{
              width: "100%",
              maxWidth: "100%",
              backgroundColor: "#f0f0f0",
            }}
          >
            <strong>
              <Link to="/" className="text-decoration-none text-blue me-1">
                Dashboard
              </Link>
              / Pages
            </strong>
          </div>
        </div>
        <div className="container mt-4">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/pages/add" className="btn btn-light me-2">
              <i className="me-1 bi bi-plus-lg"></i>New
            </Link>
            <ActionButton
              label="Edit"
              iconClass="bi bi-pencil"
              variant="light"
              onClick={handleEditClick}
            />
            <ActionButton
              label="Delete"
              iconClass="bi bi-x-lg"
              variant="light"
              onClick={handleDeleteNavigation}
            />
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
                    onClick={handleSortClick}
                  >
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
