import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';
import TextEditor from '../../../src/components/TextEditor.vue';

describe('TextEditor.vue', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = shallowMount(TextEditor, {
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