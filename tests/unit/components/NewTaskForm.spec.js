import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import NewTaskForm from '../../../src/components/NewTaskForm.vue';

describe('NewTaskForm.vue', () => {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(NewTaskForm);
  })

  it('submit event', () => {
    wrapper.vm.submit();
    expect(wrapper.emitted().submit).to.have.lengthOf(1);
  })
})