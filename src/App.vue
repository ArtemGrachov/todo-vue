<template>
  <div>
    <div class="container">
      <h1>ToDo App</h1>
      <task-item></task-item>
      <task-item></task-item>
      <task-item></task-item>
      <task-item></task-item>
    </div>
  </div>
</template>

<script>
import TaskItemVue from "./components/TaskItem.vue";

export default {
  name: "app",
  components: { "task-item": TaskItemVue }
};
</script>

<style>
  .container {
    width: auto;
    margin: 0 auto;
    max-width: 800px;
    padding: 12px;
  }
</style>
