<template>
  <div class="notifications-list">
    <transition-group name="notification">
      <app-notification
        class="notification"
        v-for="(notification, index) in notifications"
        :key="notification.id"
        :notification="notification"
        @close="deleteNotification(index)"
      ></app-notification>
    </transition-group>
  </div>
</template>

<script>
import AppNotification from './AppNotification.vue';

export default {
  components: {
    AppNotification
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  },
  methods: {
    deleteNotification(index) {
      this.$store.dispatch('deleteNotification', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.notifications-list {
  position: fixed;
  z-index: 75;
  bottom: 20px;
  left: 20px;
  width: 100%;
  max-width: 350px;
}

.notification {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
