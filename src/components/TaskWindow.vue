<template>
  <div>test</div>
</template>

<script>
export default {
  props: ['inputData'],
  computed: {
    task: function() {
      // eslint-disable-next-line
      console.log(JSON.stringify(this.$store.state.tasks))
      return this.$store.state.tasks.find(task => task._id === this.inputData)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
