import { useEffect, useState } from 'react';
import Alumnos from './Alumnos';


function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/saludo')
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje))
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <Alumnos/>
    
    
  );
}

export default App;
