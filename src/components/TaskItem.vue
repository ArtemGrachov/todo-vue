<template>
  <div class="host">
    <div class="title">
      {{ task.title }}
    </div>
    <div class="description">
      {{ task.description }}
    </div>
    <div class="actions">
      <button @click="deleteTask">
        Delete
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "TaskItem",
  props: ["task"],
  methods: {
    deleteTask() {
      this.$emit('delete', this.task._id);
    }
  }
};
</script>

<style>
.host {
  margin-bottom: 10px;
  border: 1px solid lightgreen;
  padding: 12px;
}

.title {
  font-weight: bold;
  margin-bottom: 12px;
}

.description {
  font-style: italic;
  margin-bottom: 10px;
}
</style>
