<template>
  <div>
    <div class="title">
      {{task.title}}
    </div>
    <div class="description">
      {{task.description}}
    </div>
    <button @click="toggleEdit">
      <i class="fas fa-edit"></i>
      Edit
    </button>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    toggleEdit() {
      this.$emit('toggleEdit');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables.scss";

.description {
  font-size: 16px;
  padding: 5px;
  border: 1px dotted $light;
  margin-bottom: 10px;
}
</style>

