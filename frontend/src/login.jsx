import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('alumno');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // 👉 para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña, tipoUsuario }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/alumnos');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error del servidor');
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

        <div className="mb-3">
          <label className="form-label">Tipo de usuario:</label>
          <select
            value={tipoUsuario}
            onChange={e => setTipoUsuario(e.target.value)}
            className="form-select"
          >
            <option value="admin">Administrador</option>
            <option value="tutor">Tutor</option>
            <option value="alumno">Alumno</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            required
            className="form-control"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
