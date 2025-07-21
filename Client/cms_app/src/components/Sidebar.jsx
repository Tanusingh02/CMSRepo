import React, { useState } from 'react';
import '../index.css'; // Import your custom styles

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { name: 'Dashboard', key: 'dashboard', icon: '📊' },
    { name: 'Pages', key: 'pages', icon: '📄' },
    { name: 'Categories', key: 'categories', icon: '🗂️' },
    { name: 'User Accounts', key: 'users', icon: '👥' }
  ];

  const getClassNames = (itemKey) => {
    return `sidebar-nav-item ${activeItem === itemKey ? 'active' : ''}`;
  };

  return (
    <div className='d-flex flex-column vh-200 mt-3 sidebar-container'>
      <ul className='nav nav-pills flex-column'>
        {menuItems.map((item) => (
          <li className='nav-item' key={item.key}>
            <a
              href='#'
              className={getClassNames(item.key)}
              onClick={() => setActiveItem(item.key)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;