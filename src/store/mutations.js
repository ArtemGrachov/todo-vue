import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION
} from './mutation-types';

export default {
  [SET_TASKS](state, payload) {
    state.tasks = payload;
  },
  [ADD_TASK](state, payload) {
    state.tasks.push(payload);
  },
  [UPDATE_TASK](state, payload) {
    const index = state.tasks.findIndex(task => task._id === payload._id);
    if (index === -1) {
      state.tasks.push(payload);
    } else {
      Object.assign(state.tasks[index], payload);
    }
  },
  [DELETE_TASK](state, payload) {
    const index = state.tasks.findIndex(task => task._id === payload);
    if (index !== -1) state.tasks.splice(index, 1);
  },
  [ADD_NOTIFICATION](state, payload) {
    state.notifications.push(payload);
  },
  [DELETE_NOTIFICATION](state, payload){ 
    state.notifications.splice(payload, 1);
  }
}