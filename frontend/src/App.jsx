import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alumnos from './Alumnos';
import Usuario from './Registro';
import Login from './Login';
import NotFound from './notfound';
import SidebarLayout from './SidebarLayout';
import LandingPage from './LandingPage';
import Menu from './Menu';
import Grupos from './Grupos';
import Tutores from './Tutores';


function App() {
  return (
    
     <Router>
      <Routes>
        <Route path="/dashboard" element={<SidebarLayout />} />
        <Route path='/menu' element={<Menu/>}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Usuario/>} />
        <Route path="/alumnos" element={<Alumnos/>} />
        <Route path="/tutores" element={<Tutores />} />
        <Route path="/grupos" element={<Grupos />} />
      </Routes>
    </Router>
    
    
    
    
    
  );
}

export default App;
