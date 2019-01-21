<template>
  <transition name="modal">
    <div class="modal modal-md" @click.self="closeWindow">
      <form class="modal-body" v-on:submit.prevent="submit()">
        <button
          type="button"
          class="button-link modal-close"
          @click="closeWindow"
          :disabled="formDisabled"
        >
          <i class="fas fa-times"></i>
        </button>
        <input
          class="editable-field title"
          type="text"
          name="title"
          id="title"
          placehlder="title"
          v-model="form.title"
          :disabled="formDisabled"
        >
        <text-editor
          class="editor-selectable-field editor-scrollable"
          :content="form.description"
          :disabled="formDisabled"
          v-model="form.description"
        ></text-editor>
        <button>Add</button>
      </form>
    </div>
  </transition>
</template>

<script>
import TextEditor from './TextEditor.vue';
export default {
  name: "NewTaskForm",
  components: {
    TextEditor
  },
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
