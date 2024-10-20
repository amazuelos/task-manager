<template>
  <div class="mx-auto p-8">
    <TaskFilter />
    <TaskList />
  </div>
</template>

<script setup>
import TaskList from '../components/TaskList.vue'
import TaskFilter from '../components/TaskFilter.vue'
</script>