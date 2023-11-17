import React from 'react';


const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col w-64 bg-gray-800 text-white">
      <nav className="sidebar-nav p-4">
        <ul>
          <li className="sidebar-nav-item mb-2">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="sidebar-nav-item mb-2">
            <a href="/profile">Profile</a>
          </li>
          <li className="sidebar-nav-item mb-2">
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;