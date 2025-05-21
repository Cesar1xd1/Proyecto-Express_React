import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alumnos from './Alumnos';
import Usuario from './Registro';

function App() {
  return (
     <Router>
      <Routes>
        {/*<Route path="/" element={<Alumnos />} />*/}
        <Route path="/" element={<Usuario/>} />
      </Routes>
    </Router>
  );
}

export default App;
