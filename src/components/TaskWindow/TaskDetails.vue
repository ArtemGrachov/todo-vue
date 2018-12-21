<template>
  <div>
    <div class="title">
      {{task.title}}
    </div>
    <div class="description">
      {{task.description}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['task']
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables.scss";

.description {
  font-size: 16px;
  padding: 5px;
  border: 1px dotted $light;
}
</style>

