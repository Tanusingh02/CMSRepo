// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";


// function EditCategory() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     type: "",
//     description: ""
//   });
//   const [loading, setLoading] = useState(true);
//   // eslint-disable-next-line no-unused-vars
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8080/categories/get/${id}`)
//       .then((res) => res.json())
//       .then((result) => {
//         setFormData(result);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch failed", err);
//         setError("Failed to fetch category data");
//         setLoading(false);
//       });
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch(`http://localhost:8080/categories/editCategory/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(formData)
//     })
//       .then((res) => res.json())
//       // eslint-disable-next-line no-unused-vars
//       .then((result) => {
//         alert("Category updated successfully");
//         navigate("/categories");
//       })
//       .catch((err) => {
//         console.error("Error updating category", err);
//         setError("Failed to update category");
//       });
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <h4>Loading category data...</h4>
//       </div>
//     );
//   }

//   return (
//     <div>
      
//         <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
//           <div className="p-3 p-md-4 rounded bg-white w-100" style={{ maxWidth: "900px" }}>
//             <h3 className="text-center mb-4" style={{ color: "#1f87c2" }}>Edit Category</h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label>Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label>Type</label>
//                 <input
//                   type="text"
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label>Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={6}
//                   className="form-control"
//                   style={{ resize: "vertical" }}
//                 />
//               </div>
//               <div className="text-center">
//                 <button type="submit" className="btn btn-primary mt-2">Update</button>
//               </div>
//             </form>
//           </div>
//         </div>
    
//     </div>
//   );
// }

// export default EditCategory;
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    desc: ""
  });

  useEffect(() => {
    // Fetch existing category data
    axios.get(`http://localhost:8080/categories/getCategory/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Failed to load category", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/categories/updateCategory/${id}`, formData)
      .then((res) => {
        console.log("Update successful:", res.data);
        navigate("/categories"); // Redirect to category list
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update category");
      });
  };

  return (
    <div>
      
        <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
          <div className="p-3 p-md-4 rounded bg-white w-100" style={{ maxWidth: "900px" }}>
            <h3 className="text-center mb-4" style={{ color: "#1f87c2" }}>Edit Category</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="form-control"
                  style={{ resize: "vertical" }}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-2">Update</button>
              </div>
            </form>
          </div>
        </div>
    
    </div>
  );
}

export default EditCategory;