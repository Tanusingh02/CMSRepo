import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ShowCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

 useEffect(() => {
console.log("token value",localStorage.getItem('token'))
  axios.get("http://localhost:8080/categories/getAll", {
    headers: {
      "Content-Type":"application/json",
      Authorization:localStorage.getItem('token'),

    }
  })
    .then((res) =>{
      console.log("Full API response",JSON.stringify(res,null,2))
      const result=res.data;
      console.log("API response data",result);
      if(Array.isArray(result.categories)){
        console.log('result.categories',result.categories)
        setCategories(result.categories);
      }else if(result && Array.isArray(result.data)){
        setCategories(result.categories);
      }
      else{
        console.log("unexpected response format",result);
        setCategories([]);
      }
    } )
    
    .catch((error) => {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch data");
    });
}, [categories]);


  const handleCheckboxChange = (id) => {
    setSelectedCategoryId(id === selectedCategoryId ? null : id);
  };

  const handleEditClick = () => {
    if (!selectedCategoryId) {
      alert("Please select a category to edit");
      return;
    }
    navigate(`/categories/edit/${selectedCategoryId}`);
  };

  const handleDeleteNavigation = () => {
    if (!selectedCategoryId) {
      alert("Please select a category to delete");
      return;
    }
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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Category List</h2>
        <div>
          <Link to="/categories/add" className="btn btn-primary me-2">New</Link>
          <button className="btn btn-primary me-2" onClick={handleEditClick} disabled={!selectedCategoryId}>Edit</button>
          <button className="btn btn-danger" onClick={handleDeleteNavigation} disabled={!selectedCategoryId}>Delete</button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th><input type="checkbox" disabled /></th>
            <th>
              Title
              <button className="btn btn-sm btn-light ms-1" onClick={handleSortClick}>
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
         {Array.isArray(categories) &&categories.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No categories found.</td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCategoryId === category._id}
                    onChange={() => handleCheckboxChange(category._id)}
                  />
                </td>
                <td>{category.title}</td>
                <td>{category.type}</td>
                <td>{category.desc}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShowCategories;
