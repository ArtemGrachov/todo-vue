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
    <button :disabled="formDisabled">
      Submit
    </button>
    <button type="button" @click="toggleEdit">
      Close edit
    </button>
  </form>
</template>

<script>
import { UPDATE_TASK } from '../../store/mutation-types';

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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
