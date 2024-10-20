<template>
  <div 
  
  data-test="taskFilter"
  class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-4">
    <button class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300" @click="setFilter('all')" :class="{ 'active bg-blue-400 text-white': filter === 'all' }">All</button>
    <button class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300" @click="setFilter('completed')" :class="{ 'active bg-blue-400 text-white': filter === 'completed' }">Completed</button>
    <button class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300" @click="setFilter('not_completed')" :class="{ 'active bg-blue-400 text-white': filter === 'not_completed' }">Pending</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTasksStore } from "../store/tasks";

const store = useTasksStore();

const setFilter = (newFilter) => {
  store.setFilter(newFilter); // Llamar a la acción para actualizar el filtro
};

// Computed para acceder al filtro de la tienda
const filter = computed(() => store.filter);
</script>