import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';


const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const userRole = localStorage.getItem("userRole"); // ✅ Retrieve role

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const menuItems = [
    { name: 'Dashboard', key: '/', icon: '📊' },
    { name: 'Pages', key: '/pages', icon: '📄' },
   
  ];

  // Add User Accounts only if admin
  if (userRole === "admin") {
    menuItems.push({ name: 'User Accounts', key: '/useraccount', icon: '👥' }, { name: 'Categories', key: '/categories', icon: '🗂️' });
  }

  const getClassNames = (itemKey) =>
    `sidebar-nav-item ${activeItem === itemKey ? 'active' : ''}`;

  return (
    <div className='d-flex flex-column mt-3 sidebar-container' style={{ float: "left" }}>
      <ul className='nav nav-pills flex-column'>
        {menuItems.map((item) => (
          <li className='nav-item' key={item.key}>
            <Link
              to={item.key}
              className={getClassNames(item.key)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
