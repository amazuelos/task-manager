<template>
  <div>
    <h1 class="gap-16 text-xl mb-4">Task List</h1>
    <div class="relative z-0 w-full mb-5 group">
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          class="block mb-2 py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
        />
        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Add Task</label>
        <button
        @click="addTask" 
        data-test="addTask"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Task
        </button>
      </div>
    </div>
    
    <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 md:gap-3 lg:gap-4 xl:gap-6">
      <li v-for="task in filteredTasks" :key="task._id"  class="flex flex-col gap-1 list-none	max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
        <div class="flex flex-col gap-1">
          <button
            @click="toggleCompletion(task)"
            data-test="toggleTask"
            class="bg-blue-500 text-white px-2 py-1 rounded mr-2 w-full"
          >
            {{ task.completed ? "Mark as Not Completed" : "Mark as Completed" }}
          </button>
          <button
            @click="removeTask(task._id)"
            data-test="deleteTask"
            class="bg-red-500 text-white px-2 py-1 rounded w-full"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTasksStore } from "../store/tasks"; // Asegúrate de que la ruta sea correcta

// Utiliza la tienda de tareas
const store = useTasksStore();
const newTask = ref("");

// Computed para acceder a las tareas filtradas
const filteredTasks = computed(() => {
  if (store.filter === 'completed') {
    return store.tasks.filter(task => task.completed);
  } else if (store.filter === 'not_completed') {
    return store.tasks.filter(task => !task.completed);
  }
  return store.tasks; // Para 'all'
});

// Cargar tareas al montar el componente
onMounted(async () => {
  await store.fetchTasks();
});

// Agregar una nueva tarea
const addTask = async () => {
  if (newTask.value.trim()) {
    await store.addTask({ title: newTask.value, completed: false });
    newTask.value = ""; // Limpiar el input
  }
};

// Eliminar una tarea
const removeTask = async (id) => {
  await store.deleteTask(id);
};

// Alternar el estado de completado de una tarea
const toggleCompletion = async (task) => {
  await store.toggleCompletion(task);
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
