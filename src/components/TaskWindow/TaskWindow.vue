<template>
  <transition name="modal">
    <div class="modal modal-md" v-if="task" @click.self="closeWindow">
      <div class="modal-body">
        <task-details
          :task="task"
        ></task-details>
      </div>
    </div>
  </transition>
</template>

<script>
import TaskDetails from './TaskDetails.vue';

export default {
  props: ['inputData'],
  components: {
    'task-details': TaskDetails,
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
