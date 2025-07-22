import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import React from 'react';
import {Link, Route} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    { name: 'Dashboard', key: '/', icon: '📊' },
    { name: 'Pages', key: '/pages', icon: '📄' },
    { name: 'Categories', key: '/categories', icon: '🗂️' },
    { name: 'User Accounts', key: '/useraccount', icon: '👥' }
  ];

  const getClassNames = (itemKey) =>
    `sidebar-nav-item ${activeItem === itemKey ? 'active' : ''}`;

  return (
    <div className='d-flex flex-column mt-3 sidebar-container'style={{float:"left"}}>
      <ul className='nav nav-pills flex-column'>
        {menuItems.map((item) => (
          <li className='nav-item' key={item.key}>
            <Link
              to={item.key}
              className={getClassNames(item.key)}
              onClick={() => setActiveItem(item.key)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

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
  );
};

export default Sidebar;