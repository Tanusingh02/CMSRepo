import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/Mainlayout";
import '../../Pages_style.css'
function Details()
{
     const { id } = useParams();

     const [pageData,setPageData]=useState({
        page_title:"",
        category:"",
        content:"",
        author:""
     })
     useEffect(() => {
    fetch(`http://localhost:8080/pages/get/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json" 
        }
    })
        .then((response) => response.json())
        .then((result) => {
        setPageData(result);
        })
        .catch((error) => {
        console.log(error);
        });
    }, [id]);


     return(
        <div>
            <MainLayout>
            <div className="page-details-container">
            <h3 className="page-title">{pageData.page_title}</h3>
            <div className="page-meta">
                <span><strong>Category:</strong> {pageData.category}</span>
                <span><strong>Author:</strong> {pageData.author}</span>
            </div>
            <div className="page-content">
                <p>{pageData.content}</p>
            </div>
            </div>
            </MainLayout>
        </div>
     )
}
export default Details;