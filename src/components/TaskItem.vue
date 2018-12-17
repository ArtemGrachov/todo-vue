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
      <template v-if="editMode">
        <button @click="cancelEdit" class="button-link">
          <i class="fas fa-times"></i>
        </button>
        <button @click="updateTask" class="button-link">
          <i class="fas fa-save"></i>
        </button>
      <button @click="deleteTask" class="button-link">
        <i class="fas fa-trash-alt"></i>
      </button>
      </template>
      <button @click="editTask" v-else class="button-link">
        <i class="fas fa-pen"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  inject: ['eventBus'],
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

<style lang="scss" scoped>
@import "../scss/styles.scss";

.host {
  padding: 8px;
  background: white;
  border-bottom: 1px dotted #cac4bf;
}

.title {
  font-weight: bold;
  color: $dark;
  margin-bottom: 12px;
}

.description {
  font-style: italic;
  margin-bottom: 10px;
  color: $medium;
}

.actions {
  text-align: right;
  button {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
