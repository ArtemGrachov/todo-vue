import Vue from 'vue';
import Vuex from 'vuex';
import stateFactory from '../../src/store/state-factory';
import mutations from '../../src/store/mutations';
import axios from 'axios';
import actionsFactory from '../../src/store/actions-factory';

Vue.use(Vuex);

export default function () {
  const state = stateFactory(),
    actions = actionsFactory(axios);

  return new Vuex.Store({
    strict: true,
    state,
    mutations,
    actions
  })
}