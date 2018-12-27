import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';
import TaskDetails from '../../../../src/components/TaskWindow/TaskDetails.vue';

describe('TaskDetails.vue', () => {
  let wrapper, vm;
  beforeEach(() => {
    wrapper = shallowMount(TaskDetails, {
      propsData: {
        task: {
          _id: '1',
          title: 'Test title',
          description: 'Test description'
        }
      }
    });
    vm = wrapper.vm;
  })

  it('emits toggle edit', () => {
    vm.toggleEdit();
    expect(wrapper.emitted().toggleEdit).to.have.lengthOf(1);
  })
})