<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-backdrop" @click="closeWindow"></div>
      <form class="modal-body" v-on:submit.prevent="submit()">
        <button
          type="button"
          class="button-link modal-close"
          @click="closeWindow"
          :disabled="formDisabled"
        >
          <i class="fas fa-times"></i>
        </button>
        <label for="title">Title</label>
        <input type="title" v-model="form.title" :disabled="formDisabled">
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="form.description"
          :disabled="formDisabled"
        ></textarea>
        <button>Add</button>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NewTaskForm",
  data: function() {
    return {
      form: {
        title: "New task",
        description: ""
      },
      formDisabled: false
    };
  },
  methods: {
    submit() {
      this.formDisabled = true;
      return this.$store
        .dispatch("createTask", this.form)
        .then(() => {
          this.closeWindow();
        })
        .catch(() => {
          this.formDisabled = false;
        });
    },
    closeWindow() {
      this.$emit("closeWindow");
    }
  }
};
</script>
