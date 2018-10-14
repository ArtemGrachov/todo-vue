<template>
  <div class="host">
    <div class="title">
      Task title
    </div>
    <div class="description">
      Task description
    </div>
    <div class="actions">
      <button>
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import TodoService from "../services/todo.service";

export default {
  name: "TaskItem"
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
