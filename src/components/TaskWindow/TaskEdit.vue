<template>
  <form @submit.prevent="updateTask" v-if="form">
    <label for="title">Title:</label>
    <input
      type="text"
      name="title"
      id="title"
      v-model="form.title"
      :disabled="formDisabled"
    >
    <label for="description">Description:</label>
    <textarea
      name="description"
      id="description"
      rows="10"
      v-model="form.description"
      :disabled="formDisabled"
    ></textarea>
    <div class="controls">
      <button
        class="button-link"
        :disabled="formDisabled"
      >
        <i class="fas fa-edit"></i>
        Update
      </button>
      <button
        class="button-link"
        type="button"
        @click="toggleEdit"
      >
        <i class="fas fa-times"></i>
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['task'],
  computed: {
    form() {
      return {
        title: this.task.title,
        description: this.task.description
      };
    }
  },
  data() {
    return {
      formDisabled: false,
      sendUpdsateSub: null
    }
  },
  methods: {
    toggleEdit() {
      this.$emit('toggleEdit');
    },
    updateTask() {
      this.formDisabled = true;
      this.$store.dispatch('updateTask', {
        id: this.task._id,
        data: this.form}).then(() => this.formDisabled = false);
    },
    deleteTask() {
      this.$store.dispatch('deleteTask', this.task._id);
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
