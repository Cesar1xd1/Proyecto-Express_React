import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alumnos from './Alumnos';
import Usuario from './Registro';
import Login from './Login';
import NotFound from './notfound';
import SidebarLayout from './SidebarLayout';



function App() {
  return (
    
     <Router>
      <Routes>
        <Route path="/dashboard" element={<SidebarLayout />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Usuario/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/alumnos" element={<Alumnos/>} />
      </Routes>
    </Router>
    
    
    
    
    
  );
}

export default App;
