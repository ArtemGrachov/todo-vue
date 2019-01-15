import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TaskDescriptionEditor from '../../../../src/components/TaskWindow/TaskDescriptionEditor.vue';

describe('TaskDescriptionEditor.vue', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = shallowMount(TaskDescriptionEditor, {
      propsData: {
        content: 'Test'
      }
    });
    vm = wrapper.vm;
  })

  it('update model', () => {
    let newValue = 'New value';
    vm.updateValue(newValue);
    expect(wrapper.emitted().input[0][0]).to.equal(newValue);
  })
})