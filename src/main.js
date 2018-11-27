import Vue from 'vue';
import App from './App.vue';
import '../node_modules/normalize.css/normalize.css';
import './scss/styles.scss';

import ToDoService from './services/todo.service';

Vue.config.productionTip = false;

const rootDependenciesMixin = {
  provide: function() {
    return {
      toDoService: ToDoService
    }
  }
}

new Vue({
  render: h => h(App),
  mixins: [rootDependenciesMixin]
}).$mount('#app')