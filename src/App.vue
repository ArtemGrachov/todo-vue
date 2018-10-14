<template>
  <div>
    <div class="container">
      <h1>ToDo App</h1>
      <task-item v-for="task in tasks" v-bind:key="task.id" v-bind:task="task"></task-item>
    </div>
  </div>
</template>

<script>
import TaskItemVue from "./components/TaskItem.vue";
import ToDoService from "./services/todo.service";

export default {
  name: "app",
  components: { "task-item": TaskItemVue },
  data: function() {
    return {
      tasks: []
    };
  },
  created() {
    ToDoService.getAllTasks().then(res => {
      this.tasks = res;
    })
  }
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
