import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Alumnos from './Alumnos';
import Usuario from './Registro';
import Login from './Login';
import NotFound from './notfound';
import SidebarLayout from './SidebarLayout';
import LandingPage from './LandingPage';
import Menu from './Menu';
import Grupos from './Grupos';
import Tutores from './Tutores';
import RutaPrivada from './RutaPrivada';


function App() {
  const [tipoUsuario, setTipoUsuario] = useState('');

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    setTipoUsuario(usuarioGuardado?.tipoUsuario || '');
  }, []);
  return (
    
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Usuario/>} />
        <Route path='/menu' element={<Menu/>}/>
        <Route path="*" element={<NotFound />} />


        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <SidebarLayout />
            </RutaPrivada>
          }
        />

        <Route
            path="/alumnos"
            element={
              <RutaPrivada>
                {['admin', 'tutor'].includes(tipoUsuario)? (
                  <SidebarLayout>
                    <Alumnos/>
                  </SidebarLayout>
                ): (
                  <Navigate to="/dashboard"/>
                )
              }
              </RutaPrivada>
            }
          />
        <Route
          path="/tutores"
          element={
            <RutaPrivada>
                {tipoUsuario === 'admin' ? (
                  <SidebarLayout>
                    <Tutores/>
                  </SidebarLayout>
                ): (
                  <Navigate to="/dashboard"/>
                )
              }
              </RutaPrivada>
          }
        />
        <Route
          path="/grupos"
          element={
            <RutaPrivada>
              <Grupos />
            </RutaPrivada>
          }
        />
      </Routes>
    </Router>
    
    
    
    
    
  );
}

export default App;
