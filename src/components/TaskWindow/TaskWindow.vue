<template>
  <div class="modal" v-if="task">
    <div class="modal-backdrop" @click="closeWindow"></div>
    <div class="modal-body modal-md">
      <task-edit
        v-if="editMode"
        :task="task"
        @toggleEdit="toggleEdit"
        @closeWindow="closeWindow"
      ></task-edit>
      <task-details
        v-else
        :task="task"
        @toggleEdit="toggleEdit"
      ></task-details>
    </div>
  </div>
</template>

<script>
import TaskDetails from './TaskDetails.vue';
import TaskEdit from './TaskEdit.vue';

export default {
  props: ['inputData'],
  components: {
    'task-details': TaskDetails,
    'task-edit': TaskEdit
  },
  data: function() {
    return {
      editMode: false
    }
  },
  computed: {
    task: function() {
      return this.$store.state.tasks.find(task => task._id === this.inputData)
    }
  },
  methods: {
    closeWindow() { 
      this.$emit('closeWindow');
    },
    toggleEdit() {
      this.editMode = !this.editMode;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
