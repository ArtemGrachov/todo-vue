<template>
  <div
    class="notification"
    :class="notification.type"
    @click="close"
  >
    <div class="notification-icon"></div>
    <div class="notification-description">
      <div class="notification-title" v-if="notification.title">
        {{notification.title}}
      </div>
      <div class="notification-text" v-if="notification.text">
        {{notification.text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['notification'],
  methods: {
    close(){
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
@import '../scss/variables.scss';

.notification {
  background: rgba(black, .85);
  color: white;
  padding: 15px;
  box-shadow: 0 4px 4px 0 rgba(black, .15);
  display: flex;
  align-items: center;
  position: relative;
  transition: $transition;

  &:hover {
    background: rgba(black, .45);
  }

  &-description {
    flex: 1 1 auto;
  }

  &-icon {
    flex: 0 0 auto;
    margin-right: 12px;
    font-size: 24px;
    font-family: 'Font Awesome 5 Free';
  }

  &-title {
    margin-bottom: 5px;
    font-weight: bold;
  }

  &.info {
    .notification{
      &-icon {
        &:before {
          content: '\f05a';
        }
      }

      &-title,
      &-icon {
        color: $blue;
      }
    }
  }

  &.success {
    .notification{
      &-icon {
        &:before {
          content: '\f058';
        }
      }

      &-title,
      &-icon {
        color: $green;
      }
    }
  }

  &.warning {
    .notification{
      &-icon {
        &:before {
          content: '\f06a';
        }
      }

      &-title,
      &-icon {
        color: $orange;
      }
    }
  }

  &.danger {
    .notification{
      &-icon {
        &:before {
          content: '\f057';
        }
      }

      &-title,
      &-icon {
        color: $red;
      }
    }
  }
}

</style>
