<template>
  <form
    @submit.prevent="formUpdate(form)"
  >
    <label for="title">Title:</label>
    <input
      class="editable-field title"
      type="text"
      name="title"
      id="title"
      v-model="form.title"
      :disabled="formDisabled"
      @input.once="setUpdateButtonShow"
    >
    <label for="description">Description:</label>
    <textarea
      class="editable-field"
      name="description"
      id="description"
      rows="10"
      v-model="form.description"
      :disabled="formDisabled"
      @input.once="setUpdateButtonShow"
    ></textarea>
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
      sendUpdsateSub: null,
      showUpdateButton: false
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
        .then(() => this.$emit('closeWindow'));
    },
    setUpdateButtonShow() {
      this.showUpdateButton = true;
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
