import React from 'react';
import {Link, Route} from "react-router-dom";

const Sidebar = () => {

    const hoverStyle = {
        backgroundColor:'#3aa8e8'
    };
    
    return (

    <div className='d-flex flex-column vh-200 mt-3' style={{width:'350px',marginLeft:'60px', borderRadius:'5px' , backgroundColor:'white' }}>
        
        <ul className='nav nav-pills flex-column'>
        <li className='nav-item' >
                <a href='#' className='nav-link text-dark hover'>Dashboard</a>
            </li>
            <li className='nav-item '>
                 <a href='/pages' className='nav-link text-dark hover'>Pages</a>
            </li>
            <li className='nav-item '>
                <a href='#' className='nav-link text-dark'>Categories</a>
            </li>
            <li className='nav-item '>
                <a href='#' className='nav-link text-dark'>User Accounts</a>
            </li>
        </ul>
           
    </div>
    )
}


export default Sidebar;