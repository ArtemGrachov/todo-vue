<template>
  <div class="host">
    <div class="title">
      {{ task.title }}
    </div>
    <div class="description">
      {{ shortDescription }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['task'],
  data: function() {
    return {
      shortDescription: ''
    };
  },
  created() {
    this.trimDescription();
  },
  methods: {
    trimDescription() {
      if (this.task.description.length > 100) {
        this.shortDescription = this.task.description.slice(0, 100).trim() + '...';
      } else {
        this.shortDescription = this.task.description;
      }
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

  &:hover {
    background: $lightHover;
  }
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

</style>
