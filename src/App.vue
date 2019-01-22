<template>
  <div class="wrap">
    <div class="page">
      <header>
        <h1 class="title title-white">ToDo App</h1>
        <div class="description">
          <b>M</b>ongoDB +
          <b>E</b>xpress +
          <b>V</b>ueJS +
          <b>N</b>ode
        </div>
      </header>
      <transition-group name="slide-x">
        <task-item v-for="(task, index) in tasks" :key="index" :task="task"></task-item>
      </transition-group>
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
        :is="modal.cmp"
        v-bind:inputData="modal.data"
        @closeWindow="closeModal(index)"
      ></component>
      <notifications-list></notifications-list>
    </div>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import NewTaskForm from "./components/NewTaskForm.vue";
import TaskWindow from "./components/TaskWindow/TaskWindow.vue";
import NotificationsList from './components/NotificationsList.vue';

export default {
  name: "app",
  inject: ["eventBus"],
  components: {
    "task-item": TaskItem,
    "new-task-form": NewTaskForm,
    "notifications-list": NotificationsList
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
    this.$store.dispatch("getTasks");
    this.eventBus.$on("openTaskWindow", taskId => {
      this.modals.push({
        cmp: TaskWindow,
        data: taskId
      });
    });
    setTimeout(() => {

      this.$store.dispatch('addNotification', {
        title: 'Test',
        text: 'Test',
        type: 'info'
      })
    }, 1000);
    setTimeout(() => {

      this.$store.dispatch('addNotification', {
        title: 'Test',
        text: 'Test',
        type: 'success'
      })
    }, 2000);
    setTimeout(() => {

      this.$store.dispatch('addNotification', {
        title: 'Test',
        text: 'Test',
        type: 'warning'
      })
    }, 3000);
    setTimeout(() => {

      this.$store.dispatch('addNotification', {
        title: 'Test',
        text: 'Test',
        type: 'danger'
      })
    }, 4000);
  },
  destroyed() {
    this.eventBus.$off("newTaskSubmit");
  },
  methods: {
    openNewTaskForm() {
      this.modals.push({ cmp: NewTaskForm });
    },
    closeModal(index) {
      this.modals.splice(index);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/variables.scss";
@import "./scss/common.scss";
.wrap {
  padding: 32px 64px;
}

.page {
  box-shadow: 0 8px 8px 8px rgba(black, 0.1);
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
