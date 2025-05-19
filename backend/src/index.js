const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde Express xd xd!' });
});




app.use(express.static(__dirname));

mongoose.connect('mongodb+srv://proyectotuto25:LUkjcAJeiUGv87rQ@cluster0.bqpjzcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Erro de conexion a MongoDB'));

connection.once('open', ()=>{
    console.log('Conexion EXITOSA a MongoDB');
});

// ---------------- Crear el MODELO de datos ---------------
const alumnoSchema = new mongoose.Schema({
    numControl : {type: String , unique: true},
    nombre : String,
    primerAp : String,
    segundoAp : String,
    semestre : { type: Number, min: 1, max: 12 },
    carrera : String,
    fechaNac : String,
    numTel : String
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

//==================== RUTAS =============================
//Ruta principal index

//---- Altas
app.post('/alumnos', async (request, response)=>{
    const alumno = new Alumno({
        numControl : request.body.numControl,
        nombre : request.body.nombre,
        primerAp : request.body.primerAp,
        segundoAp : request.body.segundoAp,
        semestre : request.body.semestre,
        carrera : request.body.carrera,
        fechaNac : request.body.fechaNac,
        numTel : request.body.numTel
    });
    const nuevoAlumno = await alumno.save();
    response.status(201).json({exito:true});
});

//-----BAJAS
app.delete('/alumnos/:id', async (request, response) => {
    const alumnoId = request.params.id;
    // Fetch the user from the database
    const alumno = await Alumno.findById(alumnoId);
    await alumno.deleteOne();
    response.status(200).json({ message : 'Registro ELIMINADO' });
});

//-----CAMBIOS
app.put('/alumnos/:id', async (request, response) => {
    const alumnoId = request.params.id;
    // Fetch the user from the database
    const alumno = await Alumno.findById(alumnoId);
    Object.assign(alumno, {
    nombre: request.body.nombre,
    primerAp: request.body.primerAp,
    segundoAp: request.body.segundoAp,
    semestre: request.body.semestre,
    carrera: request.body.carrera,
    fechaNac: request.body.fechaNac,
    numTel: request.body.numTel
});

    
    const updatedItem = await alumno.save();
    response.status(200).json(updatedItem);
});

//-----CONSULTAS
app.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//----Consulta para encontrar solo 1
app.get('/alumnos/:id', async (request, response) => {
    const alumno = await Alumno.findById(request.params.id);
    response.status(200).json(alumno);
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
