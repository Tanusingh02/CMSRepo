import React, { useState } from 'react';

const AddPageForm = () => {
  const [page_title, setPageTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

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
        } 
      }).catch((error) => 
        {
        console.error('Error inserting data:', error);
        alert('Error inserting data');
      });
  };
    return(
        <div>
        <div className="d-flex justify-content-center align-items-start vh-100 bg-light" style={{width:"450px"}}>
        <div className="p-4 rounded shadow bg-white" style={{width:"100%",maxWidth:"900px"}}>
             <h3 className='text-center mb-4 ' style={{color:" #1f87c2"}}>Add-Page</h3>
            <form onSubmit={add_pages}>
                <div className="mb-3">
                <label>Page Title</label>
                <input type="text"  value={page_title} onChange={(e)=>setPageTitle(e.target.value)} className="form-control" ></input>
                </div>
            <div className="mb-3">
                <label >Category</label>
                <input type="text"  value={category} onChange={(e)=>setCategory(e.target.value)} className="form-control" ></input>
                </div>
            <div className="mb-3">
                <label >Content</label>
                <input type="text"  value={content} onChange={(e)=>setContent(e.target.value)} className="form-control" ></input>
                </div> 
            <div className="mb-3">
                <label >Author</label>
                <input type="text"  value={author} onChange={(e)=>setAuthor(e.target.value)} className="form-control" ></input>
                </div> 
             <div className="text-center">
                <button type="submit" className='btn btn-primary mt-2'>Add Page</button>
                </div> 
            </form>
        </div>
    </div>
    </div>
    )
}
export default AddPageForm;