import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alumnos from './Alumnos';


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Alumnos />} />
        
      </Routes>
    </Router>
  );
}

export default App;
