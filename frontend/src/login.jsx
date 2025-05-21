import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('alumno');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña, tipoUsuario }),
      });
      const data = await res.json();

      if (res.ok) {
        onLoginSuccess(data); // enviar token y tipoUsuario hacia componente padre si quieres
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error del servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>Tipo de usuario:</label>
      <select value={tipoUsuario} onChange={e => setTipoUsuario(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="tutor">Tutor</option>
        <option value="alumno">Alumno</option>
      </select>

      <label>Usuario:</label>
      <input
        type="text"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
        required
      />

      <label>Contraseña:</label>
      <input
        type="password"
        value={contraseña}
        onChange={e => setContraseña(e.target.value)}
        required
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login; 