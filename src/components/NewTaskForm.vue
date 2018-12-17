<template>
  <form v-on:submit.prevent="submit()">
    <label for="title">Title</label>
    <input type="title" v-model="form.title">
    <label for="description">Description</label>
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="10"
      v-model="form.description"
    ></textarea>
    <button>
      Add
    </button>
  </form>
</template>

<script>
export default {
  name: 'NewTaskForm',
  inject: ['eventBus'],
  data: function() {
    return {
      form: {
        title: 'New task',
        description: ''
      }
    };
  },
  methods: {
    submit() {
      this.eventBus.$emit('newTaskSubmit', this.form);
    },
    closeWindow() {
      this.$emit('closeWindow');
    }
  }
};
</script>
