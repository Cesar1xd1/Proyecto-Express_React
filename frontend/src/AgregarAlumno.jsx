import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgregarAlumno = () => {
  const [modalData, setModalData] = useState({
    numControl: '',
    nombre: '',
    primerAp: '',
    segundoAp: '',
    semestre: '',
    carrera: '',
    fechaNac: '',
    numTel: '',
    alumno_id: ''
  });

  const agregarRegistro = () => {
    fetch('/alumnos', {
      method: 'POST',
      body: JSON.stringify(modalData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          title: "Registro Agregado",
          text: "Datos Correctos!",
          icon: "success"
        });
        setModalData({ ...modalData, alumno_id: '' }); // Limpiar los datos del formulario
      });
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Alumno</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="numControl" className="form-label">Número de Control</label>
          <input
            type="text"
            className="form-control"
            id="numControl"
            value={modalData.numControl}
            onChange={(e) => setModalData({ ...modalData, numControl: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={modalData.nombre}
            onChange={(e) => setModalData({ ...modalData, nombre: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="primerAp" className="form-label">Primer Apellido</label>
          <input
            type="text"
            className="form-control"
            id="primerAp"
            value={modalData.primerAp}
            onChange={(e) => setModalData({ ...modalData, primerAp: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="segundoAp" className="form-label">Segundo Apellido</label>
          <input
            type="text"
            className="form-control"
            id="segundoAp"
            value={modalData.segundoAp}
            onChange={(e) => setModalData({ ...modalData, segundoAp: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="semestre" className="form-label">Semestre</label>
          <input
            type="text"
            className="form-control"
            id="semestre"
            value={modalData.semestre}
            onChange={(e) => setModalData({ ...modalData, semestre: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="carrera" className="form-label">Carrera</label>
          <input
            type="text"
            className="form-control"
            id="carrera"
            value={modalData.carrera}
            onChange={(e) => setModalData({ ...modalData, carrera: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaNac" className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            id="fechaNac"
            value={modalData.fechaNac}
            onChange={(e) => setModalData({ ...modalData, fechaNac: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numTel" className="form-label">Número de Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="numTel"
            value={modalData.numTel}
            onChange={(e) => setModalData({ ...modalData, numTel: e.target.value })}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={agregarRegistro}>Guardar</button>
      </form>
    </div>
  );
};

export default AgregarAlumno;
