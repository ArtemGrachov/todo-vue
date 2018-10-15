<template>
  <div class="host">
    <template v-if="editMode">
      <input type="text" v-model="editForm.title">
      <textarea cols="30" rows="10" v-model="editForm.description"></textarea>
    </template>
    <template v-else>
      <div class="title">
        {{ task.title }}
      </div>
      <div class="description">
        {{ task.description }}
      </div>
    </template>
    <div class="actions">
      <button @click="deleteTask">
        Delete
      </button>
      <template v-if="editMode">
        <button @click="updateTask">
          Update
        </button>
        <button @click="cancelEdit">
          Close edit
        </button>
      </template>
      <button @click="editTask" v-else>
        Edit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["task"],
  data: function() {
    return {
      editMode: false,
      editForm: {
        title: this.task.title,
        description: this.task.description
      }
    };
  },
  methods: {
    deleteTask() {
      this.$emit("delete", this.task._id);
    },
    editTask() {
      this.editMode = true;
    },
    updateTask() {
      this.editMode = false;
      this.$emit("update", this.task._id, this.editForm);
    },
    cancelEdit() {
      this.editMode = false;
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
