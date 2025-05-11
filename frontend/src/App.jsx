import { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/saludo')
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje))
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <div>
      <h1>Frontend con React</h1>
      <p>{mensaje}</p>
    </div>
  );
}

export default App;
