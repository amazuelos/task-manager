import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tasks', {
  serverSelectionTimeoutMS: 5000,  // Puedes ajustar el timeout si lo necesitas
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Esquema de tarea
const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

// Rutas para manejar las tareas
// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Crear nueva tarea
app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Eliminar tarea
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Escuchar en el puerto 3001
app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});