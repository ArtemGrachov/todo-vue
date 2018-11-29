import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import actionsFactory from './actions-factory';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

const actions = actionsFactory(axios);

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions
});