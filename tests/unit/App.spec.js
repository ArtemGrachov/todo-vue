import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import App from '../../src/App.vue';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  })

  it('toggle new task form', () => {
    const formStateInverted = !wrapper.vm.newTaskForm;
    wrapper.vm.toggleForm();
    expect(wrapper.vm.newTaskForm).to.equal(formStateInverted);
  })
})