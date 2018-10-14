<template>
  <form v-on:submit.prevent="submit()">
    <h2>New task</h2>
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
    <button>Send</button>
  </form>
</template>

<script>
export default {
  name: "NewTaskForm",
  data: function() {
    return {
      form: {
        title: "New task",
        description: ""
      }
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.form);
    }
  }
};
</script>
