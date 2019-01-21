<template>
  <form
    @submit.prevent="formUpdate(form)"
  >
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
      v-model="form.title"
      :disabled="formDisabled"
      @input.once="setUpdateButtonShow"
    >
    <text-editor
      class="editor-selectable-field editor-menu-hidden"
      :content="task.description"
      :disabled="formDisabled"
      @inputEvent.once="setUpdateButtonShow"
      v-model="form.description"
    ></text-editor>
    <div class="controls">
      <button
        v-if="showUpdateButton"
        class="button-link"
        :disabled="formDisabled"
      >
        <i class="fas fa-edit"></i>
        Update
      </button>
      <button
        type="button"
        class="button-link delete-button"
        :disabled="formDisabled"
        @click="deleteTask"
      >
        <i class="fas fa-trash-alt"></i>
        Delete
      </button>
    </div>
  </form>
</template>

<script>
import TextEditor from '../TextEditor.vue';
export default {
  components: {
    TextEditor
  },
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
      sendUpdsateSub: null,
      showUpdateButton: false,
      editor: null
    }
  },
  methods: {
    filterForm(form) {
      const newForm = {};
      for (let key in form) {
        if (form[key] !== this.task[key]) {
          newForm[key] = form[key];
        }
      }
      return newForm;
    },
    updateTaskRequest(form) {
      this.formDisabled = true;
      this.$store.dispatch('updateTask', {
        id: this.task._id,
        data: form
      }).then(() => this.formDisabled = false);
    },
    formUpdate(form) {
      const filtered = this.filterForm(form);

      // eslint-disable-next-line
      for (let key in filtered) {
        this.updateTaskRequest(filtered);
        break;
      }
    },
    deleteTask() {
      this.formDisabled = true;
      this.$store.dispatch('deleteTask', this.task._id)
        .then(() => this.closeWindow());
    },
    setUpdateButtonShow() {
      this.showUpdateButton = true;
    },
    closeWindow() {
      this.$emit('closeWindow');
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
}

.delete-button {
  margin-left: auto;
}
</style>
