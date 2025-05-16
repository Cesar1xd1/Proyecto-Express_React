import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState({
  numControl: '',
  nombre: '',
  primerAp: '',
  segundoAp: '',
  semestre: '1',
  carrera: 'ISC',
  fechaNac: '',
  numTel: ''
});
  {/* varibles de Paginacion */}
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 5;
  const esquema = {
    numControl: '',
    nombre: '',
    primerAp: '',
    segundoAp: '',
    semestre: '1',
    carrera: 'ISC',
    fechaNac: '',
    numTel: ''
  };

const [datos,setDatos] = useState (esquema);
const cargarAlumno = (alumno) => {
  setAlumnoSeleccionado(alumno);
};


  
const handleChange = (e) => {
  const { name, value } = e.target;
  setDatos(prev => ({
    ...prev,
    [name]: value,
  }));
};
  
  {/* proxima pagina*/}
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  {/* anterior pagina */}
  const handlePrevious = () => {
    if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
    }
  };
  {/* Calcular botones necesarios y su numeracion */}
  const getPaginationRange = () => {
    const rangeSize = 3; 
    const start = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const end = Math.min(start + rangeSize - 1, totalPages);
    return [start, end];
  };
{/* variables para usar en el dom */}
const [startPage, endPage] = getPaginationRange();
const alumnosDT = alumnos.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

{/* Eliminar */}
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

{/* Cargar/actualizar registro */}
  const fetchAlumnos = () => {
    fetch('http://localhost:3001/alumnos')
      .then(res => res.json())
      .then(data => {
        setAlumnos(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage)); // Establece el número total de páginas
      })
      .catch(err => console.error('Error al obtener alumnos:', err));
  };

{/* registros Cargados */}  
useEffect(() => {
 fetchAlumnos();
}, []);

{/* Alta */}
const enviarDatos = () => {
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
    setDatos(esquema);
    })
    .catch(err => {
      console.error('Error al agregar:', err);
      Swal.fire('Error', 'No se pudo agregar el alumno', 'error');
    });
};

{/* Alta */}
const guardar = (id) => {
  fetch(`http://localhost:3001/alumnos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(alumnoSeleccionado)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Alumno editado:', data);
      Swal.fire('Éxito', 'Cambios guardados correctamente', 'success');
      fetchAlumnos();
    setDatos(esquema);
    })
    .catch(err => {
      console.error('Error al agregar:', err);
      Swal.fire('Error', 'No se pudo realizar el cambio', 'error');
    });
};

if(document.getElementById("fechaNac")){
    document.getElementById("fechaNac").addEventListener("click", function () {
  this.showPicker();
});
}
if(document.getElementById("fechaNac2")){
    document.getElementById("fechaNac2").addEventListener("click", function () {
  this.showPicker();
});

}





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
                data-bs-toggle="modal" data-bs-target="#modalA"
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
                <tr className='text-center'>
                  <th>Numero de Control</th>
                  <th>Nombre</th>
                  <th colSpan={2} className='text-center'>Apellidos</th>
                  
                  <th>Semestre</th>
                  <th>Carrera</th>
                  <th>Fecha de nacimiento</th>
                  <th>Num. de Telefono</th>
                  <th colSpan={2} className='text-center'>Accion</th>
                  
                </tr>
              </thead>
              <tbody>
                {/* Cargar registros de forma dinamica */}
                {alumnosDT.length > 0 ? (
                  alumnosDT.map((row) => (
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
                          data-bs-target="#modalC"
                           data-bs-toggle="modal"
                          onClick={() => cargarAlumno(row)}
                        >Editar</button>
                        </td>
                        <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarAlumno(row._id)}
                        >Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center">No hay registros.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Paginacion */}
          <nav aria-label="Paginación">
  <ul className="pagination justify-content-center">
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={handlePrevious}>
        Anterior
      </button>
    </li>
    {[...Array(endPage - startPage + 1)].map((_, index) => (
      <li key={startPage + index} className={`page-item ${currentPage === startPage + index ? 'active' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(startPage + index)}>
          {startPage + index}
        </button>
      </li>
    ))}
    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
      <button className="page-link" onClick={handleNext}>
        Siguiente
      </button>
    </li>
  </ul>
</nav>
        </div>
      </div>
      



{/* Modal Altas */}
<div class="modal fade" id="modalA" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <input type="text" name="numControl" id="numControl" 
                                    value={datos.numControl} onChange={handleChange} 
                                    required class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" id="nombre" 
                                    value={datos.nombre} onChange={handleChange} required class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Primer Apellido:</label>
                                    <input type="text" name="primerAp" id="primerAp" value={datos.primerAp} onChange={handleChange}
                                    required class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Segundo Apellido:</label>
                                    <input type="text" name="segundoAp" id="segundoAp" value={datos.segundoAp} onChange={handleChange}
                                    required class="form-control" />
                                </div>
                                
                               <div class="mb-3">
    <label>Semestre</label>
    <select name="semestre" id="semestre" class="form-control"
    value={datos.semestre} onChange={handleChange} required >
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
    <select name="carrera" id="carrera" class="form-control"
    value={datos.carrera} onChange={handleChange} required>
        <option value="ISC">ISC</option>
        <option value="IM">IM</option>
        <option value="CP">CP</option>
        <option value="LA">LA</option>
        <option value="IIA">IIA</option>
    </select>
</div>
								<div class="mb-3">
                                    <label>Fecha de Nacimiento:</label>
                                    <input type="date" name="fechaNac" id="fechaNac" value={datos.fechaNac} onChange={handleChange} 
                                    required class="form-control" />
                                    <script>
                                      
                                    </script>
                                </div>
								<div class="mb-3">
                                    <label>Num. De Telefono</label>
                                    <input type="text" name="numTel" id="numTel" value={datos.numTel} onChange={handleChange}
                                    required class="form-control" />
                                </div>
                            </div>
                            
                        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() => enviarDatos}>Agregar</button>
      </div>
    </div>
  </div>
</div>


{/* Modal Cambios */}
<div class="modal fade" id="modalC" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="alumnoform">
                           
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label>Numero de Control:</label>
                                    <input type="text" name="numControl" id="numControl" 
                                    value={alumnoSeleccionado.numControl} 
                                    readOnly
                                    required class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" id="nombre" 
                                    value={alumnoSeleccionado.nombre} onChange={(e) => setAlumnoSeleccionado({ ...alumnoSeleccionado, nombre: e.target.value })}
                                     required class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Primer Apellido:</label>
                                    <input type="text" name="primerAp" id="primerAp" value={alumnoSeleccionado.primerAp} onChange={(e) => setAlumnoSeleccionado({ ...alumnoSeleccionado, primerAp: e.target.value })}
                                    required class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label>Segundo Apellido:</label>
                                    <input type="text" name="segundoAp" id="segundoAp" value={alumnoSeleccionado.segundoAp} onChange={(e) => setAlumnoSeleccionado({ ...alumnoSeleccionado, segundoAp: e.target.value })}
                                    required class="form-control" />
                                </div>
                                
                               <div class="mb-3">
    <label>Semestre</label>
    <select name="semestre" id="semestre" class="form-control"
    value={alumnoSeleccionado.semestre} onChange={(e) => setAlumnoSeleccionado({ ...alumnoSeleccionado, semestre: e.target.value })} required >
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
    <select name="carrera" id="carrera" class="form-control"
    value={alumnoSeleccionado.carrera} onChange={(e) => setAlumnoSeleccionado({ ...alumnoSeleccionado, carrera: e.target.value })} required>
        <option value="ISC">ISC</option>
        <option value="IM">IM</option>
        <option value="CP">CP</option>
        <option value="LA">LA</option>
        <option value="IIA">IIA</option>
    </select>
</div>
								<div class="mb-3">
                                    <label>Fecha de Nacimiento:</label>
                                    <input type="date" name="fechaNac2" id="fechaNac2" value={alumnoSeleccionado.fechaNac} onChange={(e) => setAlumnoSeleccionado({ ...alumnoSeleccionado, fechaNac: e.target.value })} 
                                    required class="form-control" />
                                    <script>
                                      
                                    </script>
                                </div>
								<div class="mb-3">
                                    <label>Num. De Telefono</label>
                                    <input type="text" name="numTel" id="numTel" value={alumnoSeleccionado.numTel} onChange={(e) => setAlumnoSeleccionado({ ...alumnoSeleccionado, numTel: e.target.value })}
                                    required class="form-control" />
                                </div>
                            </div>
                            
                        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => guardar(alumnoSeleccionado._id)}>Guardar</button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};


export default Alumnos;
