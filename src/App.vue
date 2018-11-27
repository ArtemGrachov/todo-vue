<template>
  <div class="wrap">
    <header>
      <h1 class="title">ToDo App</h1>
      <div class="description">
        <b>M</b>ongoDB + <b>E</b>xpress + <b>V</b>ueJS + <b>N</b>ode
      </div>
    </header>
    <task-item
      v-for="task in tasks"
      v-bind:key="task.id"
      v-bind:task="task"
      @delete="deleteTask"
      @update="updateTask"
    ></task-item>
    <div class="new-task-form">
      <button class="button-link form-toggle-button" @click="toggleForm">
        <i class="fas fa-times" v-if="newTaskForm"></i>
        <i class="fas fa-plus-circle" v-else></i>
        New task
      </button>
      <new-task-form @submit="createTask" v-if="newTaskForm"></new-task-form>
    </div>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import NewTaskForm from "./components/NewTaskForm.vue";

export default {
  name: "app",
  components: {
    "task-item": TaskItem,
    "new-task-form": NewTaskForm
  },
  data: function() {
    return {
      tasks: [],
      newTaskForm: false
    };
  },
  created() {
    this.getAllTasks();
  },
  methods: {
    getAllTasks() {
      this.toDoService.getAllTasks().then(res => {
        this.tasks = res;
      });
    },
    createTask(taskData) {
      this.toDoService.createTask(taskData).then(res => {
        this.tasks.push(res);
      });
    },
    updateTask(taskId, taskData) {
      this.toDoService.updateTask(taskId, taskData).then(res => {
        const index = this.tasks.findIndex(task => task._id === res._id);
        if (index === -1) {
          this.tasks = this.tasks.concat(res);
        } else {
          const arr = [].concat(this.tasks);
          arr[index] = res;
          this.tasks = arr;
        }
      });
    },
    deleteTask(taskId) {
      this.toDoService.deleteTask(taskId).then(() => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      });
    },
    toggleForm() {
      this.newTaskForm = !this.newTaskForm;
    }
  },
  inject: ['toDoService']
};
</script>
<style lang="scss" scoped>
@import './scss/variables.scss';
.wrap {
  margin: 32px 64px;
  box-shadow: 0 8px 8px 8px rgba(black, .1);
  background: white;
}

header {
  margin: 0 0 8px;
  color: white;
  background: #7e6549;
}

.title {
  font-size: 24px;
  padding: 16px 8px 8px;
}

.description {
  padding: 8px;
  background: $bright;
  color: #5a4731;
  font-size: 14px;
}

.new-task-form {
  padding: 8px;
}

.form-toggle-button {
  display: block;
  width: 100%;
}
</style>
