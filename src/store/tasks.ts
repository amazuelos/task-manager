import { defineStore } from 'pinia';
import axios from 'axios';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as { title: string; completed: boolean; _id: string }[],
    filter: 'all' as 'all' | 'completed' | 'not_completed',
  }),
  actions: {
    async fetchTasks() {
      const response = await axios.get('http://localhost:3001/tasks');
      this.tasks = response.data;
    },
    async addTask(newTask: { title: string; completed: boolean }) {
      try {
        const response = await axios.post('http://localhost:3001/tasks', newTask);
        this.tasks.push(response.data); 
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async deleteTask(id: string) {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      this.tasks = this.tasks.filter(task => task._id !== id);
    },
    async toggleCompletion(task: { _id: string; completed: boolean }) {
      const updatedCompletedStatus = !task.completed; // Alternar el estado
      try {
        await axios.patch(`http://localhost:3001/tasks/${task._id}`, { completed: updatedCompletedStatus }); // Actualiza en el servidor
        // Después de actualizar en el servidor, actualiza el estado local
        const taskToUpdate = this.tasks.find(t => t._id === task._id);
        if (taskToUpdate) {
          taskToUpdate.completed = updatedCompletedStatus; // Actualiza el estado local
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    setFilter(newFilter: 'all' | 'completed' | 'not_completed') {
      this.filter = newFilter;
    },
  },
  persist: true, // Activar la persistencia
});
