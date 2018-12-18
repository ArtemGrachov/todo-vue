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
      <button class="button-link form-toggle-button" @click="openNewTaskForm">
        <i class="fas fa-times" v-if="newTaskForm"></i>
        <i class="fas fa-plus-circle" v-else></i>
        New task
      </button>
    </div>
    <component
      v-for="(modal, index) in modals"
      :key="index"
      :is="modal"
      @closeWindow="closeModal(index)"
    ></component>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import NewTaskForm from "./components/NewTaskForm.vue";

export default {
  name: "app",
  inject: ['eventBus'],
  components: {
    "task-item": TaskItem,
    "new-task-form": NewTaskForm
  },
  data: function() {
    return {
      newTaskForm: false,
      modals: []
    };
  },
  computed: {
    tasks: function() {
      return this.$store.state.tasks;
    }
  },
  created() { 
    this.$store.dispatch('getTasks');
  },
  destroyed() {
    this.eventBus.$off('newTaskSubmit');
  },
  methods: {
    updateTask(taskId, taskData) {
      this.$store.dispatch('updateTask', { id: taskId, data: taskData });
    },
    deleteTask(taskId) {
      this.$store.dispatch('deleteTask', taskId);
    },
    openNewTaskForm() {
      this.modals.push(NewTaskForm);
    },
    closeModal(index) {
      this.modals.splice(index);
    }
  }
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
