<template>
  <div>{{notification}}</div>
</template>

<script>
export default {
  props: ['notification'],
  methods: {
    close(){
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
</style>
