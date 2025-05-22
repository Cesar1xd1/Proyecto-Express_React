import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alumnos from './Alumnos';
import Usuario from './Registro';
import Login from './Login';
import NotFound from './notfound';


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Usuario/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
