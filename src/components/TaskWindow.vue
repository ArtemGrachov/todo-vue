<template>
  <div class="modal">
    <div class="modal-backdrop" @click="closeWindow"></div>
    <div class="modal-body">
      {{ task }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['inputData'],
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
