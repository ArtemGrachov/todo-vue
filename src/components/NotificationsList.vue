<template>
  <ul></ul>
</template>

<script>
export default {
  methods: {
    removeNotification(index) {
      this.$store.dispatch('deleteNotification', index);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
