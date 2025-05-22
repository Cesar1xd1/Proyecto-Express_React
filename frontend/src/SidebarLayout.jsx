// SidebarLayout.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


const SidebarLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 transition-all`}
        style={{
          width: collapsed ? '60px' : '250px',
          transition: 'width 0.3s',
          overflow: 'hidden',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          {!collapsed && <h5 className="mb-0">Servicio Tutorias</h5>}
          <Button
            variant="outline-light"
            size="sm"
            onClick={toggleSidebar}
            className="ms-auto"
          >
            {collapsed ? '☰' : '<'}
          </Button>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white d-flex align-items-center" href="/alumnos">
    <i className="bi bi-house text-white me-2"></i>
    {!collapsed && 'Alumnos'}
  </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              {collapsed ? '👤' : 'Usuarios'}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              {collapsed ? '⚙️' : 'Ajustes'}
            </a>
          </li>
        </ul>
      </div>

      {/* Contenido */}
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
