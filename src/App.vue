<template>
  <div>
    <div class="container">
      <h1>ToDo App</h1>
      <task-item
        v-for="task in tasks"
        v-bind:key="task.id"
        v-bind:task="task"
        @delete="deleteTask"
      ></task-item>
      <new-task-form @submit="createTask"></new-task-form>
    </div>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import NewTaskForm from "./components/NewTaskForm.vue";

import ToDoService from "./services/todo.service";

export default {
  name: "app",
  components: {
    "task-item": TaskItem,
    "new-task-form": NewTaskForm
  },
  data: function() {
    return {
      tasks: []
    };
  },
  created() {
    this.getAllTasks();
  },
  methods: {
    getAllTasks() {
      ToDoService.getAllTasks().then(res => {
        this.tasks = res;
      });
    },
    createTask(taskData) {
      ToDoService.createTask(taskData).then(res => {
        this.tasks.push(res);
      });
    },
    updateTask() {},
    deleteTask(taskId) {
      ToDoService.deleteTask(taskId).then(() => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      });
    }
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
