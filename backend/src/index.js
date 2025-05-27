const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

//--- modelo de usuario ---
const usuariosSchema = new mongoose.Schema({
  tipoUsuario: {type: String, enum: ["admin", "tutor", "alumno"], required: true},
  usuario: {type: String, required:true, unique: true},
  contraseña: {type: String, required: true}
});

const Usuario = mongoose.model('Usuario', usuariosSchema);

//--- registro de usuario ---
app.post('/usuario', async (request, response) => {
    try {
      const { tipoUsuario, usuario, contraseña } = request.body;

      const existente = await Usuario.findOne({ usuario });
      if (existente) {
        return response.status(400).json({ message: 'Usuario existente' });
      }

      const hash = await bcrypt.hash(contraseña, 15);
      const nuevoUsuario = new Usuario({ tipoUsuario, usuario, contraseña: hash });

      await nuevoUsuario.save();
      response.status(201).json({ message: 'usuario registrado' });

    } catch (err) {
      console.error('Error al registrar usuario:', err);
      response.status(500).json({ error: 'Error al registrar usuario' });
    }
});

 
// --- login ---
app.post('/login', async (req, res) => {
  const { usuario, contraseña, tipoUsuario } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado) {
      return res.status(400).json({ message: 'Usuario incorrecto' });
    }

    if (usuarioEncontrado.tipoUsuario !== tipoUsuario) {
      return res.status(403).json({ message: 'Tipo de usuario incorrecto' });
    }

    const match = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      usuario: usuarioEncontrado.usuario,
      tipoUsuario: usuarioEncontrado.tipoUsuario,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
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

//-----Filtrado por semestre y carrera
app.get('/alumnos/:semestre/:carrera', async (request, response) => {
  const { semestre, carrera } = request.params;

  try {
    const alumnos = await Alumno.find({ semestre, carrera });
    response.status(200).json(alumnos);
  } catch (error) {
    response.status(500).json({ error: 'Error al buscar los alumnos' });
  }
});

{/* tutores */}
const tutorSchema = new mongoose.Schema({
    numControl : {type: String , unique: true},
    nombre : String,
    primerAp : String,
    segundoAp : String,
    semestre : { type: Number, min: 1, max: 12 },
    carrera : String,
    fechaNac : String,
    numTel : String
});

const Tutor = mongoose.model('Tutor', tutorSchema);

//---- Altas
app.post('/tutores', async (request, response)=>{
    const tutor = new Tutor({
        numControl : request.body.numControl,
        nombre : request.body.nombre,
        primerAp : request.body.primerAp,
        segundoAp : request.body.segundoAp,
        semestre : request.body.semestre,
        carrera : request.body.carrera,
        fechaNac : request.body.fechaNac,
        numTel : request.body.numTel
    });

    const existente = await Tutor.findOne({ numControl });
      if (existente) {
        return response.status(400).json({ message: 'Numero de control existente' });
      }
    const nuevoTutor = await tutor.save();
    response.status(201).json({exito:true});
});

//-----BAJAS
app.delete('/tutores/:id', async (request, response) => {
    const tutorId = request.params.id;
    const tutor = await Tutor.findById(tutorId);
    await tutor.deleteOne();
    response.status(200).json({ message : 'Registro ELIMINADO' });
});

//-----CAMBIOS
app.put('/tutores/:id', async (request, response) => {
    const tutorId = request.params.id;
    const tutor = await Tutor.findById(tutorId);
    Object.assign(tutor, {
    nombre: request.body.nombre,
    primerAp: request.body.primerAp,
    segundoAp: request.body.segundoAp,
    semestre: request.body.semestre,
    carrera: request.body.carrera,
    fechaNac: request.body.fechaNac,
    numTel: request.body.numTel
});

    
    const updatedItem = await tutor.save();
    response.status(200).json(updatedItem);
});

//-----CONSULTAS
app.get('/tutores', async (req, res) => {
  try {
    const tutores = await Tutor.find();
    res.json(tutores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//----Consulta para encontrar solo 1
app.get('/tutores/:id', async (request, response) => {
    const tutor = await Tutor.findById(request.params.id);
    response.status(200).json(tutor);
});

// Ruta para obtener el tutor del grupo
app.get('/tutor/:semestre/:carrera', async (req, res) => {
  const { semestre, carrera } = req.params;
  try {
    const tutor = await Tutor.findOne({ semestre, carrera });
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor no encontrado' });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tutor', error });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
