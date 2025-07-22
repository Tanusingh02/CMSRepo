import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from "../layouts/Mainlayout";
import 'bootstrap/dist/css/bootstrap.min.css';


const AddPageForm = () => {
  const navigate = useNavigate();
  const [page_title, setPageTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryData,setCategoryData]=useState({
    categories:[],
     totalPages: 0,
     currentPage: 1
  });

   useEffect(() => {
    fetch('http://localhost:8080/categories/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((result) => {
          setCategoryData({
            categories: result.categories,
            totalPages: result.totalPages || 0,
            currentPage: result.currentPage || 1
          });
      }).catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const add_pages = (e) => {
    e.preventDefault();

    const data = {
      page_title:page_title,
      category:category,
      content:content,
      author:author
    };

    fetch('http://localhost:8080/pages/addPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => 
      {
          return response.json();

      }).then((result) => 
        {
        if (result.message === 'Inserted') 
        {
          alert('Data inserted');
          navigate('/pages');
        } 
      }).catch((error) => 
        {
        console.error('Error inserting data:', error);
        alert('Error inserting data');
      });

  };
    return(
        <div>
          <MainLayout>
            <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
            <div className="p-3 p-md-4 rounded  bg-white w-100" style={{ maxWidth: "900px" }}>
             <h3 className='text-center mb-4 ' style={{color:" #1f87c2"}}>Add-Page</h3>
            <form onSubmit={add_pages}>
                <div className="mb-3">
                <label>Page Title</label>
                <input type="text"  value={page_title} onChange={(e)=>setPageTitle(e.target.value)} className="form-control" ></input>
                </div>
            <div className="mb-3">
                <label>Category</label>
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
              </div>

            <div className="mb-3">
                <label >Content</label>
                <textarea  value={content} onChange={(e)=>setContent(e.target.value)} row={6} className="form-control" style={{ resize: "vertical" }}/>
                </div> 
            <div className="mb-3">
                <label >Author</label>
                <input type="text"  value={author} onChange={(e)=>setAuthor(e.target.value)} className="form-control" ></input>
                </div> 
             <div className="text-center">
                <button type="submit" className='btn btn-primary w-100 w-md-auto mt-2'>Add Page</button>
                </div> 
            </form>
        </div>
    </div>
     </MainLayout>
    </div>
    )
}
export default AddPageForm;