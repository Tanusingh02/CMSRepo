import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
 
function CategoryForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={
        title:title,
        type:type,
        desc:desc
    };
 
    fetch("http://localhost:8080/categories",{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("token")
        },
        body:JSON.stringify(data)
    }).then((response)=>
    {
        return response.json();
    // eslint-disable-next-line no-unused-vars
    }).then((result)=>
    {
        alert("Category created successfully!");
        console.log(data);
        navigate('/categories')
    // eslint-disable-next-line no-unused-vars
    }).catch((error)=>
    {
        console.log("Error occured")
    })
       
    
  };
 
  return (
    
<div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
  <div className="p-4 rounded bg-white w-100" style={{ maxWidth: "600px" }}>
    {/* Form content here */}
  

      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <input className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary me-4" onClick={handleSubmit} >Save</button>
        {/* <button type="button" className="btn btn-secondary" onClick={() => navigate("/categories")}>Cancel</button> */}
      </form>
    </div>
    </div>
  );
}
 
export default CategoryForm;