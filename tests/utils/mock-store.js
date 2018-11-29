import Vue from 'vue';
import Vuex from 'vuex';
import state from '../../src/store/state';
import mutations from '../../src/store/mutations';
import actions from './mock-actions';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions
})