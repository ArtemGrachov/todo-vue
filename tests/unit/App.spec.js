import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import mockStoreFactory from '../utils/mock-store-factory';
import {
  // SET_TASKS,
  ADD_TASK,
  // UPDATE_TASK,
  // DELETE_TASK
} from '../../src/store/mutation-types';
import App from '../../src/App.vue';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      store: mockStoreFactory()
    });
  });

  it('loading tasks', () => {
    wrapper.vm.$store.subscribe((mutation, state) => {
      expect(wrapper.vm.tasks).to.deep.equal(state.tasks);
    });
  });

  it('createTask', () => {
    const newTask = {
      title: 'New task',
      description: 'New task description'
    };

    wrapper.vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {
        expect(
          wrapper
          .vm
          .tasks
          .find(
            task => task.title === newTask.title && task.description === newTask.description
          )
        ).to.be.ok;
      }
    });

    wrapper.vm.createTask(newTask);
  });
});