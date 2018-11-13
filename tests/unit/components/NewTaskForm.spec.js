import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import NewTaskForm from '../../../src/components/NewTaskForm.vue';

describe('NewTaskForm.vue', () => {
  it('mounted', () => {
    const wrapper = shallowMount(NewTaskForm);
    expect(wrapper).be.a('object')
  })
})