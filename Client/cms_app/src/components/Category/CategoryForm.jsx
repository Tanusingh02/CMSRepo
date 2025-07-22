import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [desc, setDescription] = useState('');

  const add_category = (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not logged in!');
    return;
  }

  const data = {
    title: title,
    type: type,
    desc: desc
  };

  axios.post(
    'http://localhost:8080/categories/createCategory',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    }
  )
  .then((response) => {
    if (response.data!=null) {
      alert('Category added successfully');
      navigate('/categories');
    } else {
      alert('Unexpected response from server');
    }
  })
  .catch((error) => {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      console.error('Status Code:', error.response.status);
      alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      alert('No response from server. Please try again later.');
    } else {
      console.error('Error setting up request:', error.message);
      alert('Error setting up request.');
    }
  });
};


  return (
    <div>
        <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
          <div className="p-3 p-md-4 rounded bg-white w-100" style={{ maxWidth: "900px" }}>
            <h3 className='text-center mb-4' style={{ color: "#1f87c2" }}>Add Category</h3>
            <form onSubmit={add_category}>
              <div className="mb-3">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Type</label>
                  <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="form-control"/>
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea value={desc} onChange={(e) => setDescription(e.target.value)} rows={6} className="form-control" style={{ resize: "vertical" }} />
              </div>
              <div className="text-center">
                <button type="submit" className='btn btn-primary w-100 w-md-auto mt-2'>Add Category</button>
              </div>
            </form>
          </div>
        </div>

    </div>
  );
};

export default CategoryForm;
