<template>
  <div class="host" @click="openTaskWindow">
    <div class="title">
      {{ task.title }}
    </div>
    <article class="description" v-html="shortDescription"></article>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['task'],
  inject: ['eventBus'],
  computed: {
    shortDescription() {
      if (this.task.description.length > 100) {
        return this.task.description.slice(0, 100).trim() + '...';
      } 
      return this.task.description;
    }
  },
  methods: {
    openTaskWindow() {
      this.eventBus.$emit('openTaskWindow', this.task._id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/styles.scss";

.host {
  padding: 8px;
  background: white;
  border-bottom: 1px dotted #cac4bf;
  cursor: pointer;

  &:hover {
    background: $lightHover;
  }
}

.description {
  margin-bottom: 10px;
}

</style>
