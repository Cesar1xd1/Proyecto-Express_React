import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';





const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);

const eliminarAlumno = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3001/alumnos/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          console.log('Alumno eliminado:', data);
          Swal.fire('Eliminado', 'El alumno ha sido eliminado.', 'success');
          fetchAlumnos();
          // Actualiza la lista si es necesario
          // Por ejemplo, llamando a una función fetchAlumnos()
        })
        .catch(err => {
          console.error('Error al eliminar:', err);
          Swal.fire('Error', 'No se pudo eliminar el alumno', 'error');
        });
    }
  });
};


  const fetchAlumnos = () => {
  fetch('http://localhost:3001/alumnos')
    .then(res => res.json())
    .then(data => setAlumnos(data))
    .catch(err => console.error('Error al obtener alumnos:', err));
};

useEffect(() => {
 fetchAlumnos();
}, []);

const enviarDatos = () => {
  const datos = {
    numControl: '773',
    nombre: 'Juan',
    primerAp: 'Pérez',
    segundoAp: 'Gómez',
    semestre: '3',
    carrera: 'ISC',
    fechaNac: '2000-01-01',
    numTel: '1234567890'
  };

  fetch('http://localhost:3001/alumnos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Alumno agregado:', data);
      Swal.fire('Éxito', 'Alumno agregado correctamente', 'success');
      fetchAlumnos();
    })
    .catch(err => {
      console.error('Error al agregar:', err);
      Swal.fire('Error', 'No se pudo agregar el alumno', 'error');
    });
};




  return (


    <div className="container">
      <h1 className="text-center mb-5 mt-5 text-danger"><b>Servicios Escolares</b></h1>
      <div className="card mb-5">
        <div className="card-header">
          <div className="row">
            <h3 className="col col-6">Tutores</h3>
            <div className="col col-6">
              <button
                type="button"
                className="btn btn-success btn-sm float-end"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
              >
                AGREGAR
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Num. Control</th>
                  <th>Nombre</th>
                  <th>Primer Ap.</th>
                  <th>Segundo Ap.</th>
                  <th>Semestre</th>
                  <th>Carrera</th>
                  <th>Fecha de nacimiento</th>
                  <th>Num. de Telefono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.length > 0 ? (
                  alumnos.map((row) => (
                    <tr key={row._id}>
                      <td>{row.numControl}</td>
                      <td>{row.nombre}</td>
                      <td>{row.primerAp}</td>
                      <td>{row.segundoAp}</td>
                      <td>{row.semestre}</td>
                      <td>{row.carrera}</td>
                      <td>{row.fechaNac}</td>
                      <td>{row.numTel}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info btn-sm"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarAlumno(row._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No hay registros.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      




<div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="alumnoform">
                           
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label>Numero de Control:</label>
                                    <input type="text" name="numControl" id="numControl" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" id="nombre" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Primer Apellido:</label>
                                    <input type="text" name="primerAp" id="primerAp" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Segundo Apellido:</label>
                                    <input type="text" name="segundoAp" id="segundoAp" class="form-control" />
                                </div>
                                
                               <div class="mb-3">
    <label>Semestre</label>
    <select name="semestre" id="semestre" class="form-control" >
        
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
    </select>
</div>
                                <div class="mb-3">
    <label>Carrera</label>
    <select name="carrera" id="carrera" class="form-control">
        
        <option value="ISC">ISC</option>
        <option value="IM">IM</option>
        <option value="CP">CP</option>
        <option value="LA">LA</option>
        <option value="IIA">IIA</option>
    </select>
</div>
								<div class="mb-3">
                                    <label>Fecha de Nacimiento:</label>
                                    <input type="date" name="fechaNac" id="fechaNac" class="form-control" />
                                </div>
								<div class="mb-3">
                                    <label>Num. De Telefono</label>
                                    <input type="text" name="numTel" id="numTel" class="form-control" />
                                </div>
                            </div>
                            
                        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={enviarDatos}>Agregar</button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};


export default Alumnos;
