import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import App from '../../src/App.vue';
import MockToDoService from '../utils/service-mocks/todo.service';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      provide: {
        toDoService: MockToDoService
      }
    });
  })

  it('toggle new task form', () => {
    const formStateInverted = !wrapper.vm.newTaskForm;
    wrapper.vm.toggleForm();
    expect(wrapper.vm.newTaskForm).to.equal(formStateInverted);
  })

  it('getAllTasks', done => {
    wrapper.vm.getAllTasks();
    wrapper.vm.$nextTick(() => {
      done();
    })
  })
})