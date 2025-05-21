import React, { useState } from 'react';

const Register = () => {
  const [tipoUsuario, setTipoUsuario] = useState('alumno');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipoUsuario, usuario, contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Usuario registrado con éxito');
        setUsuario('');
        setContraseña('');
        setTipoUsuario('alumno');
      } else {
        setError(data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error del servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <label>Tipo de usuario:</label>
      <select value={tipoUsuario} onChange={e => setTipoUsuario(e.target.value)}>
        <option value="admin">Administrador</option>
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

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
