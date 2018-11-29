import Vue from 'vue';
import Vuex from 'vuex';
import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from './mutation-types';
import axios from 'axios';

import apiConfig from '../configs/api.config';
const tasksUrl = apiConfig.url + 'tasks';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    tasks: []
  },
  mutations: {
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
    }
  },
  actions: {
    getTasks(context) {
      axios.get(tasksUrl)
        .then(res => res.data)
        .then(data => context.commit(SET_TASKS, data));
    },
    createTask(context, payload) {
      axios.post(tasksUrl, payload)
        .then(res => res.data)
        .then(data => context.commit(ADD_TASK, data));
    },
    updateTask(context, payload) {
      axios.put(`${tasksUrl}/${payload.id}`, payload.data)
        .then(res => res.data)
        .then(data => context.commit(UPDATE_TASK, data));
    },
    deleteTask(context, payload) {
      axios.delete(`${tasksUrl}/${payload}`)
        .then(res => res.data)
        .then(data => context.commit(DELETE_TASK, data._id));
    }
  },
})