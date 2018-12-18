<template>
  <div class="modal">
    <div class="modal-backdrop" @click="closeWindow"></div>
    <form class="modal-body" v-on:submit.prevent="submit()">
      <button type="button" class="button-link modal-close" @click="closeWindow">
        <i class="fas fa-times"></i>
      </button>
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
  </div>
</template>

<script>
export default {
  name: 'NewTaskForm',
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
      this.$store.dispatch('createTask', this.form);
    },
    closeWindow() {
      this.$emit('closeWindow');
    }
  }
};
</script>
