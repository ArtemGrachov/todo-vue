import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import mockStore from '../utils/mock-store';
import App from '../../src/App.vue';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $store: mockStore
      }
    });
  });

  it('toggle new task form', () => {
    const formStateInverted = !wrapper.vm.newTaskForm;
    wrapper.vm.toggleForm();
    expect(wrapper.vm.newTaskForm).to.equal(formStateInverted);
  });

  
})